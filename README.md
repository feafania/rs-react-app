# React Forms & State Management

> **RS School React Course** — Task 6  
> **Branch:** `forms`

A React application implementing comprehensive form handling using two distinct strategies: Uncontrolled Components (native `FormData`) and Controlled Components via `React Hook Form`. The application features an accessible modal via React Portals, schema-based validation, and global state tracking.

---

## 🚀 Links

- **Live Demo:** [feafania.github.io/rs-react-app/](https://feafania.github.io/rs-react-app/)
- **Repository:** [github.com/feafania/rs-react-app/tree/forms](https://github.com/feafania/rs-react-app/tree/forms)

---

## 🛠️ Features & Requirements Implemented

### 1. Reusable Modal via React Portals

- Rendered using React Portals directly into `document.body`.
- Fully accessible focus management including a built-in **Focus Trap** (looping `Tab` navigation).
- Closes safely via the `ESC` key, clicking outside the layout (native backdrop), or via the exit control.
- Automatically preserves and returns focus to the initiating button upon dismissal.

### 2. Dual Form Implementations (Uncontrolled vs. RHF)

- **Uncontrolled Form:** Built entirely without React Hook Form. Harvests data on submission via native `FormData` and executes schema validation strictly on-submit.
- **React Hook Form (RHF):** Leverages controlled validation fields operating under real-time (`onChange`/`all`) checks. The submission interface is live-disabled when fields fail structural requirements.

### 3. Comprehensive Schema Validation (Zod)

- Shared data parameters validated via custom **Zod** logic to ensure UI synchronicity.
- **Name:** First letter capitalization enforcement.
- **Age:** Positive integer constraints (no layout drops or negative values).
- **Email:** Deliberately built _without regex_ using strict, sequential string checks (`split('@')`) to evaluate local parts and active domain dots.
- **Image Upload:** Intercepts uploads, validates types strictly (`png`/`jpeg`), calculates file capacity directly out of Base64 metadata, and saves results globally.
- **Password Engine:** Real-time cross-matching with a localized visual complexity checker (monitoring numbers, casing, and special characters).
- **Country Selection:** Automated autocomplete lookup mapping directly against stored store elements.

### 4. Global State Tracking (Zustand)

- Configured via a central state store to capture successful form entries.
- Appends historical profile data into dynamic dashboard tiles on the main screen.
- Newly submitted items rendering into view receive a temporary highlight border for immediate visual confirmation.

---

## 💻 Development & Testing

### Prerequisites

- Node.js `>= 18`
- npm

### CLI Commands

| Command            | Description                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------ |
| `npm install`      | Install all dependencies (`react-hook-form`, `zod`, `@hookform/resolvers`, `zustand`, etc.) |
| `npm run dev`      | Spin up local development infrastructure (`localhost:5173`)                                 |
| `npm run build`    | Compile the application code for stable distribution                                        |
| `npm run test`     | Initiate Vitest assertions in local watch mode                                              |
| `npm run test:run` | Execute all test files a single time                                                        |
| `npm run coverage` | Extract operational code testing metrics                                                    |
| `npm run deploy`   | Push production layouts directly onto GitHub Pages                                          |

### Coverage Specifications

The test matrix enforces the following coverage baselines:

- **Statements:** ≥ 80%
- **Branches / Functions / Lines:** ≥ 50%
