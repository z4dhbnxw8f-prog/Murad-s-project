# Ankommen
Next.js, React, TypeScript and Tailwind CSS information platform.

## Run
`npm install` then `npm run dev`. Production: `npm run build` and `npm start`.

Content and translations live in `data/content.ts`. UI components are in `components/platform.tsx`. Languages: English, German and Turkish, selected through the header. Checklists persist locally without accounts. The finder recommends reading; it does not determine immigration eligibility.

## Before publishing
- Supply the real operator and contact information, and review legal/privacy notices.
- Set `NEXT_PUBLIC_SITE_URL` for the sitemap.
- Have pathway-specific legal content reviewed. Guides are introductory overviews and link to authorities; the shared preparation framework is not a complete visa application manual.
- Newsletter delivery and social accounts are not configured; no subscription or social destination is invented.
- Photography is hosted locally. See public/images/CREDITS.md for sources and free-use license details.

No deployment is configured or performed.

## Validation
`npm run build` validates the production build and types. Run `npx playwright install chromium` once, start the app on port 3000, then run `npx playwright test`. Optionally set `PLAYWRIGHT_EXECUTABLE_PATH` to an existing Chromium executable. Tests cover finder branching, guide search, checklist persistence, language persistence, responsive overflow, image loading, and mobile navigation.
