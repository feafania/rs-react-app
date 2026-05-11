# React Class Components & Unit Testing

> RS School React Course — Task 2 | Branch: `unit-testing`

## Description

A React application built with **class components** that allows users to search Star Wars characters via the [SWAPI](https://swapi.py4e.com/) API, displays results, persists search terms with localStorage, and handles errors gracefully with an Error Boundary.

This branch adds comprehensive **unit tests** using Vitest and React Testing Library.

---

## Live Demo

🔗 [https://feafania.github.io/rs-react-app/](https://feafania.github.io/rs-react-app/)

---

## Repository

🐙 [https://github.com/feafania/rs-react-app/tree/unit-testing](https://github.com/feafania/rs-react-app/tree/unit-testing)

---

## Features

- 🔍 **Search** — search for Star Wars characters with trimmed input and no duplicate requests
- 💾 **Local Storage** — saves and restores the last search term between sessions
- 📋 **Results Display** — shows character name and description (gender, height, birth year)
- ⏳ **Loading State** — loader visible during API requests
- ⚠️ **Error Handling** — human-readable error messages for 4xx/5xx responses and network failures
- 🛡️ **Error Boundary** — catches render errors, logs them, and displays fallback UI with "Try again" button
- 🔴 **Error Simulation Button** — triggers a test error to verify Error Boundary behavior

---

## Tech Stack

- [React 19](https://react.dev/) — class components only (no hooks)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) — test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — component testing
- [SWAPI](https://swapi.py4e.com/) — Star Wars REST API

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm

### Installation

```bash
git clone https://github.com/feafania/rs-react-app.git
cd rs-react-app
git checkout unit-testing
npm install
```

### Running the app

```bash
npm run dev
```

Open [http://localhost:5173/rs-react-app/](http://localhost:5173/rs-react-app/) in your browser.

### Building for production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Testing

### Run tests in watch mode

```bash
npm run test
```

### Run tests once

```bash
npm run test:run
```

### Run tests with coverage report

```bash
npm run coverage
```

Coverage thresholds configured:

| Metric     | Threshold |
| ---------- | --------- |
| Statements | ≥ 80%     |
| Branches   | ≥ 50%     |
| Functions  | ≥ 50%     |
| Lines      | ≥ 50%     |

---

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.tsx
│   ├── ResultList.tsx
│   ├── ResultRow.tsx
│   ├── ResultsSection.tsx
│   ├── SearchButton.tsx
│   ├── SearchInput.tsx
│   ├── SearchSection.tsx
│   └── TriggerErrorButton.tsx
├── test/
│   ├── __tests__/
│   │   ├── app/
│   │   │   ├── App.edgeCases.test.tsx
│   │   │   ├── App.error.test.tsx
│   │   │   ├── App.loading.test.tsx
│   │   │   ├── App.localStorage.test.tsx
│   │   │   ├── App.render.test.tsx
│   │   │   └── App.search.test.tsx
│   │   ├── ResultList.test.tsx
│   │   ├── ResultRow.test.tsx
│   │   ├── ResultsSection.test.tsx
│   │   ├── SearchButton.test.tsx
│   │   ├── SearchInput.test.tsx
│   │   ├── SearchSection.test.tsx
│   │   ├── TriggerErrorButton.test.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   └── getCharacterDescription.test.ts
│   ├── mocks/
│   │   ├── characters.ts
│   │   ├── fetch.ts
│   │   └── localStorage.ts
│   └── setup.ts
├── types/
│   └── types.ts
├── util/
│   └── getCharacterDescription.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

---

## Application Layout

```
+-------------------------------------------------------+
|  +---------------- Search Section ----------------+   |
|  | [Search Input Field]        | [Search Button]  |   |
|  +--------------------------------------------------+  |
|                                                       |
|  +---------------- Results Section ---------------+  |
|  | Character Name  | Description                  |  |
|  | Luke Skywalker  | Gender: male | Height: 172.. |  |
|  | Leia Organa     | Gender: female | Height: 150 |  |
|  +--------------------------------------------------+  |
|                              [Trigger Error Button]   |
+-------------------------------------------------------+
```

---

## API

This project uses **[SWAPI (Star Wars API)](https://swapi.py4e.com/)**.

Example requests:

```
GET https://swapi.py4e.com/api/people/?page=1
GET https://swapi.py4e.com/api/people/?search=luke&page=1
```

---

## Notes

- Class components are used throughout — hooks are not used
- Search input is trimmed before sending requests
- No duplicate API requests are made if the search term hasn't changed
- Error Boundary wraps the main app and displays fallback UI on failure
- All API calls are mocked in tests — no real network requests during testing
- Husky runs tests automatically on `pre-push`
