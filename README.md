# FreshHire — Job Board Prototype

A frontend-only prototype of a job board for a Pune-based recruitment startup,
built to demo entry-level hiring flows to investors. No backend — all data
lives in `src/data/jobs.json` as seed data, then in React state and
`localStorage` once you start interacting with it (saving jobs, applying,
posting new roles).

## Tech stack

- **React 18** (Create React App)
- **React Router v6** for routing
- **Plain CSS** with a CSS-variable design token system (`src/styles/variables.css`)
- **React Context** for global state — no Redux, no external state library

## Getting started

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

To build a static production bundle:

```bash
npm run build
```

## Pages

| Route               | Page              | Notes                                              |
|----------------------|-------------------|-----------------------------------------------------|
| `/`                  | Home              | Hero search, live stats, category cards, featured jobs |
| `/jobs`              | Jobs              | Search, filter sidebar, sort, responsive grid       |
| `/jobs/:id`          | Job Detail        | Full description + inline application form         |
| `/saved-jobs`        | Saved Jobs        | Bookmarked jobs via `SavedJobsContext`              |
| `/my-applications`   | My Applications   | Status tracker via `ApplicationsContext`            |
| `/post-job`          | Post a Job        | Company-facing job posting form                    |
| `*`                  | Not Found         | 404 fallback                                        |

## State & data flow

- **`JobsContext`** — seeds from `jobs.json` on first load (simulated with a
  short delay so `SkeletonCard` has something to do), then persists any
  newly posted jobs to `localStorage` so they survive a refresh.
- **`SavedJobsContext`** — stores an array of saved job IDs in `localStorage`.
- **`ApplicationsContext`** — stores submitted applications, seeded with a
  few demo entries in different statuses (Applied, Under Review, Interview,
  Offer) so the tracker doesn't look empty on first visit.

All three are plain `localStorage`-backed contexts — swapping them for real
API calls later means changing the inside of these three files only; no page
or component needs to change.

## Design notes

- Palette: deep indigo (trust) + sprout green (growth/new beginnings) +
  marigold (the warmth of an offer letter) — deliberately not another
  blue-and-white SaaS template.
- Type: Sora for headings, Inter for body text, JetBrains Mono for numbers
  (salaries, stats, dates) to give data a slightly more "real product" feel.
- Fully responsive: filter sidebar collapses to a toggle on mobile, hero
  search stacks, footer grid reflows to 2 columns.

## What's intentionally out of scope

This is a demo prototype, not a production app:

- No real authentication — anyone can "post a job" or "apply"
- No real file upload — resume upload just captures the filename
- No backend/database — refreshing in incognito resets everything
- No email notifications

These are natural next steps once the client signs off on the direction.
