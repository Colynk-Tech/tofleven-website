# Tofleven website

A production-ready Astro and Node.js implementation of the supplied Tofleven
design system. The site is bilingual, responsive, accessible, and intentionally
lightweight: most pages are pre-rendered, while the contact pages run on the
Node server.

## Run locally

Requirements: Node.js 22.12 or newer.

```sh
npm ci
cp .env.example .env
npm run dev
```

Open `http://localhost:4321`.

## Quality checks

```sh
npm run check
npm run build
npm run build:launch
npm start
```

`build:launch` is intentionally stricter than the normal development build. It
fails while required business facts, active registrations, trust copy, content
reviewers, review dates, or fluent-English approval remain unverified in
`src/lib/business.ts`.

`npm start` serves the production build from `dist/server/entry.mjs`.

## Docker

Build and run the production image:

```sh
docker build -t tofleven .
docker run --rm -p 4321:4321 --env-file .env tofleven
```

The container listens on port `4321` and runs as the unprivileged `node` user.
Set the contact delivery variables from `.env.example` in the deployment
environment; do not copy a production `.env` file into the image.

## Continuous integration

The GitHub Actions build runs the Astro checks, creates the production build,
and verifies the Docker image on pushes and pull requests for `main` and
the `release` or `release/**` branches. It can also be started manually from the
Actions tab.

## Routes

| Dutch | English |
| --- | --- |
| `/` | `/en/` |
| `/over-mij` | `/en/about` |
| `/verantwoording` | `/en/approach` |
| `/contact` | `/en/contact` |
The sitemap is available at `/sitemap.xml`.

Canonical content URLs use a trailing slash. Astro enforces this for on-demand
routes; the deployment platform must enforce the same convention for
prerendered files without creating a redirect chain.

## Contact delivery

During local development, the contact form validates and shows a preview
success state without sending or storing the message.

For production, set:

- `CONTACT_WEBHOOK_URL`: HTTPS endpoint that receives the contact payload
- `CONTACT_WEBHOOK_TOKEN`: optional bearer token
- `CONTACT_RATE_LIMIT_SECRET`: a long random value used to hash rate-limit keys

The webhook receives a JSON object containing `requestId`, `name`, `email`,
`subject`, `message`, `locale`, and `consentAt`. Requests time out after eight
seconds and include an idempotency key.

Do not enable `CONTACT_FORM_MODE=preview` in production unless you deliberately
want a demonstration form that does not deliver messages.

## Where to edit

- Copy and SEO: `src/lib/content.ts`
- Verified business facts and review status: `src/lib/business.ts`
- Metadata and JSON-LD: `src/lib/seo.ts`
- Design tokens and responsive styles: `src/styles/global.css`
- Shared layout: `src/layouts/BaseLayout.astro`
- Contact delivery: `src/actions/index.ts`
- Fonts and other static assets: `public/`

## Before launch

Complete every item in `SEO-LAUNCH-CHECKLIST.md` and confirm that
`npm run build:launch` passes. The Cloudflare-compatible `public/_headers` file
contains the proposed response policies. A Node deployment must apply the same
headers at its reverse proxy or hosting layer and should enable HSTS only after
valid HTTPS works on both apex and `www`.

Both normal variable fonts remain preloaded: the built WOFF2 files are about
186 KB (Fraunces) and 73 KB (Source Sans 3). They are used above the fold, but
the combined transfer is material. Keep the preloads until post-deployment
Lighthouse and real-user Core Web Vitals data can test whether subsetting or
removing one preload improves LCP without causing visible font swaps.
