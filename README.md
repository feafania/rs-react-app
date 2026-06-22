# Next.js. Server Side Rendering

## Description
A modern Star Wars Explorer application migrated from Vite to **Next.js App Router**. The application leverages Server-Side Rendering (SSR), Static Site Generation (SSG), and Server Components to achieve optimal performance, SEO, and user experience. It features full internationalization (i.e., multi-language support), a hand-crafted theme switcher via React Context, server-side dynamic routing, and server-driven actions for data updates and secure CSV compiling.

## Live Demo
🔗 [Vercel Deployment Shell](https://rs-react-app-nextjs.vercel.app) *(or your specific hosting URL)*

## Repository
🐙 https://github.com/feafania/rs-react-app/tree/nextjs-ssr

---

## Features

* **Next.js App Router Integration** — Native file-based routing with robust layout synchronization (`[locale]` dynamic segments). No more heavy SPA client-side routers.
* **Deep SSR & SSG Splitting** — Initial search payloads and data tables are pre-rendered on the server via React Server Components (RSC). The About page is generated as a pure static page (SSG) at build time.
* **Internationalization (i21n)** — Complete interface translation engine powered by `next-intl`. Supports dynamic client-side locale selection switching and fully localized link navigation wrappers.
* **Handcrafted Layouts & Theme Context** — Shared shell wrapper UI optimized for fluid view shifts. Contains a fully custom dark/light theme layer that maps to `body.dataset.theme` utilizing local storage persistence without extra heavy third-party bundles.
* **Server Actions & Endpoints** — Fast data export mechanics. Selected character items compile direct database records into structural streams utilizing clean Node.js back-end endpoints to deliver ready-to-download `.csv` attachments instantly.
* **Granular Progressive Hydration** — Wrapped in dynamic layouts (`loading.tsx`), the primary layout handles loading states gracefully via Streaming HTML elements while fetching Star Wars API (SWAPI) structures.

---

## Tech Stack

* **React 19** & **Next.js 16 (App Router)**
* **TypeScript** (Strict Type Definitions)
* **next-intl** — Internationalization routing engine
* **@tanstack/react-query** — Highly efficient client-side dynamic query state synchronization
* **Zustand** — Ultra-lightweight reactive global slice storage for item selections

---

## Getting Started

### Prerequisites
* Node.js >= 18.x
* npm / pnpm / yarn

### Installation
```bash
git clone [https://github.com/feafania/rs-react-app.git](https://github.com/feafania/rs-react-app.git)
cd rs-react-app
git checkout nextjs-ssr
npm install