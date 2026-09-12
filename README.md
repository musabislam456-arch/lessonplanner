# LessonPlanner AI

**Live site:** [lessonplanner.utilix.site](https://lessonplanner.utilix.site)

Smart lesson plan, worksheet, and rubric generator for teachers — free, structured, and standards-aligned.

## Features

- **Lesson Plan** generator (5E model, Common Core alignment)
- **Worksheet Builder** — fill-in-the-blank practice worksheets
- **Rubric Generator** — 4-level grading rubrics
- Blog with teaching guides for SEO
- Built for fast, in-browser use — no signup friction

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/lesson-plan, tools/worksheet, tools/rubric, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
lib/            Blog data
```

## License

All rights reserved.
