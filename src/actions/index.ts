import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";

const SUBJECT_KEYS = [
	"individual",
	"relationship",
	"child-parent",
	"hold-me-tight",
] as const;

type SubjectKey = (typeof SUBJECT_KEYS)[number];

interface RateLimitRecord {
	count: number;
	resetAt: number;
}

interface ContactPayload {
	requestId: string;
	name: string;
	email: string;
	subject: SubjectKey;
	message: string;
	locale: "nl" | "en";
	consentAt: string;
}

interface ContactResult {
	ok: true;
	preview: boolean;
	requestId: string;
}

const rateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

async function getRateLimitKey(clientAddress: string): Promise<string> {
	const secret =
		import.meta.env.CONTACT_RATE_LIMIT_SECRET ??
		process.env.CONTACT_RATE_LIMIT_SECRET ??
		"tofleven-local-rate-limit-key";
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(clientAddress),
	);

	return Array.from(new Uint8Array(signature), (byte) =>
		byte.toString(16).padStart(2, "0"),
	).join("");
}

async function assertWithinRateLimit(clientAddress: string): Promise<void> {
	const now = Date.now();
	const key = await getRateLimitKey(clientAddress);
	const existing = rateLimits.get(key);

	if (!existing || existing.resetAt <= now) {
		rateLimits.set(key, {
			count: 1,
			resetAt: now + RATE_LIMIT_WINDOW_MS,
		});
		return;
	}

	if (existing.count >= RATE_LIMIT_MAX) {
		throw new ActionError({
			code: "TOO_MANY_REQUESTS",
			message: "Too many contact requests. Please try again later.",
		});
	}

	existing.count += 1;
}

async function deliverContactMessage(
	payload: ContactPayload,
): Promise<{ preview: boolean }> {
	const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

	if (!webhookUrl) {
		if (
			import.meta.env.DEV ||
			import.meta.env.CONTACT_FORM_MODE === "preview" ||
			process.env.CONTACT_FORM_MODE === "preview"
		) {
			return { preview: true };
		}

		throw new ActionError({
			code: "SERVICE_UNAVAILABLE",
			message: "Contact delivery is not configured.",
		});
	}

	let response: Response;

	try {
		response = await fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Idempotency-Key": payload.requestId,
				...(process.env.CONTACT_WEBHOOK_TOKEN
					? {
							Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`,
						}
					: {}),
			},
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(8_000),
		});
	} catch {
		throw new ActionError({
			code: "BAD_GATEWAY",
			message: "The contact delivery service could not be reached.",
		});
	}

	if (!response.ok) {
		throw new ActionError({
			code: "BAD_GATEWAY",
			message: "The contact delivery service rejected the request.",
		});
	}

	return { preview: false };
}

export const server = {
	contact: defineAction({
		accept: "form",
		input: z
			.object({
				name: z.string().trim().min(2).max(100),
				email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
				subject: z.enum(SUBJECT_KEYS),
				message: z.string().trim().min(10).max(5_000),
				consent: z.boolean().refine(Boolean),
				locale: z.enum(["nl", "en"]),
				website: z.string().max(200).optional(),
			})
			.strict(),
		handler: async (input, context): Promise<ContactResult> => {
			const requestId = crypto.randomUUID();

			if (input.website) {
				return {
					ok: true,
					preview: false,
					requestId,
				};
			}

			await assertWithinRateLimit(context.clientAddress);

			const delivery = await deliverContactMessage({
				requestId,
				name: input.name,
				email: input.email,
				subject: input.subject,
				message: input.message,
				locale: input.locale,
				consentAt: new Date().toISOString(),
			});

			return {
				ok: true,
				preview: delivery.preview,
				requestId,
			};
		},
	}),
};
