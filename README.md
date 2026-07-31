# Tofleven website

A production-ready Astro and Node.js implementation of the supplied Tofleven
design system. The site is bilingual, responsive, accessible, and intentionally
lightweight: most pages are pre-rendered, while the contact pages run on the
Node server.

## Run locally

Requirements: Node.js 22.12 or newer.

```sh
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:4321`.

## Quality checks

```sh
npm run check
npm run build
npm start
```

`npm start` serves the production build from `dist/server/entry.mjs`.

## Routes

| Dutch | English |
| --- | --- |
| `/` | `/en/` |
| `/over-mij` | `/en/about` |
| `/verantwoording` | `/en/approach` |
| `/contact` | `/en/contact` |
| `/privacy` | `/en/privacy` |

The sitemap is available at `/sitemap.xml`.

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
- Design tokens and responsive styles: `src/styles/global.css`
- Shared layout: `src/layouts/BaseLayout.astro`
- Contact delivery: `src/actions/index.ts`
- Fonts and other static assets: `public/`

## Before launch

Replace or confirm the placeholder practice details, approved privacy copy,
final logo, and photography. Configure and test the production webhook before
publishing the contact form.
