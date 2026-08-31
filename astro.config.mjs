// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

const isSitesBuild = process.env.TOFLEVEN_TARGET === 'sites';

// https://astro.build/config
export default defineConfig({
	site: 'https://tofleven.nl',
	output: 'static',
	trailingSlash: 'always',
	adapter: isSitesBuild
		? cloudflare({
				imageService: 'compile',
				prerenderEnvironment: 'node',
			})
		: node({
				mode: 'standalone',
			}),
	security: {
		checkOrigin: true,
		actionBodySizeLimit: 32 * 1024,
	},
	i18n: {
		defaultLocale: 'nl',
		locales: ['nl', 'en'],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},
});
