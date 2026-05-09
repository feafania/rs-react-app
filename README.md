# React Class Components & Error Boundary

> RS School React Course — Task 1 | Branch: `class-components`

## Description

A React application built with **class components** that allows users to search items via a RESTful API, displays results, persists search terms, and handles errors gracefully with an Error Boundary.

---

## Features

- 🔍 **Search** — search for items using a RESTful API with trimmed input and no duplicate requests
- 💾 **Local Storage** — saves and restores the last search term between sessions
- 📋 **Results Display** — shows item name and description for each result
- ⏳ **Loading State** — spinner/loader visible during API requests
- ⚠️ **Error Handling** — human-readable error messages for 4xx/5xx responses
- 🛡️ **Error Boundary** — catches render errors, logs them, and displays fallback UI
- 🔴 **Error Simulation Button** — triggers a test error to verify Error Boundary behavior

---

## Tech Stack

- [React](https://react.dev/) — class components only (no hooks)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- RESTful API — [PokéAPI](https://pokeapi.co/) *(or your chosen API)*

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or yarn

### Installation

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
git checkout class-components
npm install
```

### Running the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Header/
│   ├── Search/
│   ├── CardList/
│   ├── Card/
│   ├── ErrorBoundary/
│   └── Spinner/
├── App.tsx
└── main.tsx
```

---

## Application Layout

```
+-------------------------------------------------------+
|  +------------------ Top controls ----------------+   |
|  | [Search Input Field]        | [Search Button]  |   |
|  +--------------------------------------------------+  |
|                                                       |
|  +-------------------- Results -----------------+    |
|  | Item Name  | Item Description                |    |
|  | [Item 1]   | [Description 1]                 |    |
|  | [Item 2]   | [Description 2]                 |    |
|  +--------------------------------------------------+  |
|                                      [Error Button]   |
+-------------------------------------------------------+
```

---

## API

This project uses **[PokéAPI](https://pokeapi.co/)** (or another RESTful API supporting search and pagination).

Example request:
```
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0&search=bulba
```

---

## Notes

- Class components are used throughout — hooks are not permitted for this task
- Search input is trimmed before sending requests
- No duplicate API requests are made if the search term hasn't changed
- Error Boundary wraps the main content area and displays fallback UI on failure# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
