import type { APIRoute } from "astro";
import { PAGE_KEYS, routes } from "../lib/content";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const base = site ?? new URL("https://tofleven.nl");
	const urls = PAGE_KEYS.flatMap((page) => [
		new URL(routes[page].nl, base).toString(),
		new URL(routes[page].en, base).toString(),
	]);
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
