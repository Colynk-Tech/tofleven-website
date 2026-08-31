import type { APIRoute } from "astro";
import { LOCALES, PAGE_KEYS } from "../lib/content";
import { getPageMetadata } from "../lib/seo";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const base = site ?? new URL("https://tofleven.nl");
	const urls = PAGE_KEYS.flatMap((page) =>
		LOCALES.map((locale) => getPageMetadata(locale, page)),
	)
		.filter(
			(metadata) => metadata.indexable && metadata.canonicalPath !== null,
		)
		.map((metadata) => new URL(metadata.canonicalPath!, base).toString());
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...urls.map((url) => `<url><loc>${url}</loc></url>`),
		"</urlset>",
	].join("");

	return new Response(body, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
