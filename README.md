# portfolio_site

Personal portfolio website (Vite + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion),
showcasing projects, skills, achievements, and professional experience.

## Run locally

### 1. Frontend (the site)

```bash
npm install      # restore dependencies (node_modules is not shipped in the zip)
npm run dev      # start the dev server
npm run build    # production build -> dist/index.html (single self-contained file)
npm run preview  # preview the production build
```

### 2. Backend (enquiry form -> MongoDB)

The contact / "Hire Me" form saves submissions to MongoDB. A small Express API
in `server/` handles this. You need MongoDB running locally (e.g. via MongoDB
Compass) on the default port `27017`.

```bash
cd server
npm install                 # install API dependencies
cp .env.example .env        # optional — defaults already point at localhost
npm start                   # starts the API on http://localhost:5000
```

What gets stored:

- **Connection:** `mongodb://localhost:27017/portfolio` (override with `MONGODB_URI` in `server/.env`)
- **Database:** `portfolio`
- **Collection:** `enquiries`

Each submission stores `name`, `email`, `subject`, `message`, `type`
(`enquiry` or `hire`), plus `createdAt` / `updatedAt` timestamps. Open MongoDB
Compass and browse the `portfolio` database to see them arrive in real time.

Endpoints: `POST /api/enquiries` (save), `GET /api/enquiries` (list recent),
`GET /api/health` (status + DB connection).

> Run both the frontend (`npm run dev`) and the backend (`cd server && npm start`)
> at the same time for the form to work. If the frontend runs on a different host,
> set `VITE_API_URL` (e.g. in a root `.env`) to point at the API.

## Animations & cursor

- **Page transitions** — clicking any nav link plays a column "curtain" wipe
  (`src/components/PageTransition.tsx`) before snapping to the target section, then
  reveals it. Honors `prefers-reduced-motion` by falling back to a smooth scroll.
- **Page-load intro** — `src/components/Loader.tsx` shows a brief animated splash.
- **Scroll reveals** — sections fade/slide in on scroll via Framer Motion
  (`src/components/Animate.tsx`).
- **Dynamic custom cursor** — `src/components/CustomCursor.tsx` renders a precise dot,
  a spring-trailed ring, and an ambient glow that react to hover/click. It activates
  only on fine-pointer (mouse/trackpad) devices; touch devices keep native behaviour.
  The native arrow is hidden via the `html.has-custom-cursor` rules in `src/index.css`,
  while text inputs keep their caret.
- **Neural-network hero background** — `src/components/ParticleField.tsx` draws a
  cursor-reactive constellation of nodes on `<canvas>` behind the hero. DPR-capped,
  node count scales with viewport, loop pauses when the tab is hidden.
- **Scroll parallax depth** — `src/components/Parallax.tsx` (useScroll + useTransform)
  drifts the decorative section glows at a different rate than the content for depth;
  applied in About, Skills, Services, and Achievements.
- **Magnetic elements** — `src/components/Magnetic.tsx` makes the hero CTAs and the
  navbar links/Hire-Me button lean toward the cursor, springing back on leave.
- **Project cards** — cursor-following spotlight glow plus subtle 3D tilt toward the
  pointer (`src/components/Projects.tsx`).
- **Scroll indicators** — a top gradient progress bar (`ScrollProgress.tsx`) and a
  right-edge vertical dot rail tracking the active section (`SectionNav.tsx`, large
  screens only).

Every motion effect is gated behind `prefers-reduced-motion` and pointer-type checks,
and falls back gracefully (plain wrappers / native scroll) when motion is reduced.

## High-impact extras

- **Interactive constellation background** — `src/components/ParticleField.tsx` draws a
  cursor-reactive canvas field in the hero: drifting nodes link to neighbours and lean
  toward the pointer. DPR-capped, node count scales with viewport, pauses when the tab
  is hidden.
- **Scroll progress bar** — `src/components/ScrollProgress.tsx` fills a thin gradient bar
  at the top as you scroll, spring-smoothed.
- **Magnetic buttons** — `src/components/Magnetic.tsx` wraps the hero CTAs so they lean
  toward the cursor on hover and spring back on leave.
- **3D tilt + cursor spotlight on project cards** — each card in
  `src/components/Projects.tsx` tilts in 3D toward the pointer and a soft radial glow
  tracks the cursor across it.
- **Decode/scramble headings** — `src/components/ScrambleText.tsx` resolves random
  glyphs into the final text the first time a heading enters view (used on the Projects
  title; reusable anywhere).

Every effect above is gated behind `prefers-reduced-motion` and, where relevant, a
fine-pointer check, so touch and reduced-motion users get clean, static fallbacks.
