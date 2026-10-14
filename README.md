# Manel Ayari — UX/UI portfolio

Personal portfolio built with Next.js (App Router), TypeScript and CSS Modules. Every page is statically generated.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start            # http://localhost:3000
```

## Check quality

```bash
npm run lint
npm run typecheck
npm run build            # the tests run against the production build
npx playwright test      # routes, links, media, interactions, axe accessibility, reduced motion
npm run qa:screenshots   # saves every page at 4 sizes into qa-screenshots/
```

The first time, install the test browser with `npx playwright install chromium`.

## Where things live

| What                                                   | Where                                                     |
| ------------------------------------------------------ | --------------------------------------------------------- |
| Name, email, role line, optional LinkedIn / CV / photo | `src/content/site.ts`                                     |
| Case-study text and media                              | `src/content/projects/*.ts`                               |
| Project order on the homepage                          | `src/content/projects/index.ts`                           |
| Colours, spacing, type scale                           | `src/app/tokens.css`                                      |
| Images and videos                                      | `public/media/<project>/`                                 |
| Social share images                                    | `public/og/` (regenerate with `node scripts/make-og.mjs`) |

## Add a project

1. Put its images and videos in `public/media/<slug>/` (lowercase, hyphenated file names).
2. Copy `src/content/projects/lafricaine.ts` to `src/content/projects/<slug>.ts` and replace the text, facts, sections and media.
3. Import it and add it to the list in `src/content/projects/index.ts`.

The homepage card, the `/work/<slug>` page, the sitemap and the "next project" links are generated automatically.

## Add LinkedIn, a CV or a photo later

Open `src/content/site.ts`:

- `linkedin: "https://www.linkedin.com/in/…"` adds a LinkedIn link to the footer.
- `cvUrl: "/manel-ayari-cv.pdf"` (put the PDF in `public/`) adds a "Download CV" link to the footer.
- `photo`: put the image under `public/media/`, import it at the top of the file and set `photo: myPhoto`. It replaces the "MA" polaroid on the About page.

Fields left as `undefined` are not shown.

## Replace the Glutenia promo films

Overwrite these files, keeping the same names and sizes:

- `public/media/glutenia/video/promo-landscape.mp4` (1920×1080) and `promo-landscape-poster.jpg`
- `public/media/glutenia/video/promo-vertical.mp4` (720×1280) and `promo-vertical-poster.jpg`

If the on-screen text changes, update the captions in `public/media/glutenia/video/promo-landscape.vtt`.

## Rebuild the media from the source folder

`npm run assets` copies everything from the original `PORTFOLLIO` folder (it only reads it), regenerates the crops, captures the live editionapa.tn homepage and rebuilds the social images. Set `PORTFOLIO_SRC` or `GLUTENIA_LOGO` if those folders move.

## Deploy

The site is hosted on Vercel (Hobby plan, free). Once the GitHub repo is connected, every push to `main` redeploys automatically. If the final address is not `https://manel-ayari.vercel.app`, set `NEXT_PUBLIC_SITE_URL` in Vercel so canonical links and share images use the right domain.
