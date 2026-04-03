# GBot

> **Smart task manager for developers — a desktop widget that captures, organizes, and enriches your development tasks in seconds without leaving your workflow.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Wails 2](https://img.shields.io/badge/Wails-2-blue.svg)](https://wails.io/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6.svg)](https://www.typescriptlang.org/)

---

## The Problem

As a developer, you constantly interrupt your flow to manage tasks: you open Notion, Trello, a notepad, or worse — you switch to the browser. Every time you do that, you lose mental context.

**GBot solves one thing:** capture, organize, and enrich development tasks in seconds, without leaving your desktop, without opening anything heavy, without typing commands.

### What GBot is NOT
- ❌ A full project management tool
- ❌ A replacement for Jira, Linear, or Notion
- ❌ A general-purpose chatbot

### What GBot IS
- ✅ A desktop widget that appears when you need it and disappears when you don't
- ✅ An AI assistant that understands the technical context of your tasks and finds useful information in real time
- ✅ A tool that improves over time by learning from your work patterns

---

## Features

### Core
- **Quick task capture** — Add, edit, and complete tasks without breaking your flow
- **Smart search** — Find any task instantly with keyboard-driven search (`Ctrl+K`)
- **Keyboard-first navigation** — Full keyboard accessibility with intuitive shortcuts
- **Persistent storage** — All tasks saved locally via SQLite, no cloud dependency

### AI-Powered (via GitHub Models)
- **Automatic task analysis** — Every saved task gets enriched with relevant suggestions, links, and context
- **Smart alternatives** — Get recommendations for libraries, tools, and approaches
- **Zero-touch auth** — GitHub Device Flow authentication, no browser required

### Desktop Integration
- **Global shortcuts** — Open/close GBot from anywhere (`Shift+B+R` / `Shift+R+B`)
- **Frameless window** — Always-on-top widget that stays out of your way
- **Linux native** — Built with Wails 2 for minimal resource usage (~10x less RAM than Electron)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Desktop Shell** | [Wails 2](https://wails.io/) (Go backend) |
| **Frontend** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| **Bundler** | [Vite](https://vitejs.dev/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Styling** | CSS Modules |
| **Testing** | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| **Database** | SQLite (via Go) |
| **AI Provider** | [GitHub Models](https://github.com/marketplace/models) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## Why Wails?

GBot v1 uses **Wails 2** as its desktop framework. Here's why:

### The Decision Process

We initially started with Tauri 2 (Rust backend), which seemed like the obvious choice for a lightweight desktop app. However, we hit a wall of **confirmed, unresolved bugs** on Linux:

- **WebKit2GTK rendering issues** — Blank/white screens on startup, requiring manual reload
- **Custom protocol conflicts** — Dev server resources not loading correctly
- **Icon system requirements** — Mandatory icon generation blocking basic development
- **Multiple open issues** — At least 6 confirmed bugs in the Tauri repo related to Linux blank screens

For a tool meant to serve the community, these weren't acceptable trade-offs. A developer shouldn't need to press `Ctrl+R` to see their app working.

### Why Wails Won

| Criteria | Tauri 2 | Wails 2 |
|----------|---------|---------|
| **Linux stability** | ⚠️ Known WebKit2GTK bugs | ✅ Works out of the box |
| **Setup complexity** | 💀 7+ issues before first render | ⭐ Single command init |
| **RAM usage** | ~30MB | ~25MB |
| **Bundle size** | ~5-10MB | ~8-15MB |
| **Backend language** | Rust (complex) | Go (simple) |
| **Community maturity** | Growing | Stable |

Wails gives us **90% of Tauri's benefits** (native webview, small bundle, low RAM) with **zero Linux headaches**. The Go backend is simpler to maintain, and the developer experience is significantly better.

### Future Considerations

If Tauri resolves its Linux issues, we may revisit it for v2. For now, Wails is the pragmatic choice that lets us focus on **building features for users**, not fighting framework bugs.

---

## Architecture

GBot combines **Hexagonal Architecture** (Ports & Adapters) with **Vertical Slice Architecture** and **Container/Presentational** patterns:

### Backend (Go) — Vertical Slice Hexagonal

Each feature is a self-contained "hexagon" with its own ports, entities, and adapters:

```
src/
├── core/
│   └── tasks/                    # Hexágono de Tareas (Vertical Slice)
│       ├── task.go               # Entidad
│       ├── task-service.go       # Lógica de negocio (hexágono)
│       ├── task-port.go          # Puerto (interfaz)
│       └── task-repository.go    # Adaptador driven (SQLite)
│   └── ai/                       # Hexágono de IA
│       ├── ai-service.go
│       ├── ai-port.go
│       └── ...
└── adapters/                     # Adaptadores compartidos
    ├── github-models/
    └── sqlite/
```

### Frontend (React) — Hexagonal + Container/Presentational

```
frontend/src/
├── core/                         # Lógica de negocio pura (independiente de React)
│   └── tasks/                    # Hexágono de Tareas
│       ├── task.ts               # Entidad
│       ├── task-service.ts       # Lógica de negocio
│       ├── task-port.ts          # Puerto (interfaz)
│       └── task-repository.ts    # Adaptador driven
├── adapters/                     # Adaptadores compartidos
│   ├── api/                      # GitHub Models, HTTP clients
│   ├── storage/                  # SQLite (vía Wails)
│   └── wails/                    # Runtime bindings
└── ui/                           # React — presentación y coordinación
    ├── components/               # 🧱 Presentacionales: Solo props → JSX. Sin estado, sin lógica.
    ├── containers/               # 💡 Inteligentes: Estado, casos de uso, orquestación.
    ├── hooks/                    # 🪝 Custom Hooks: Lógica de UI reutilizable.
    └── pages/                    # 📄 Vistas principales (ensamblan containers).
```

**Key principles:**
- **Separation of concerns**: Business logic lives in `core/`. UI lives in `ui/`. Adapters bridge the gap.
- **Vertical slices**: Each feature (tasks, ai, auth) is self-contained. No cross-cutting dependencies.
- **Smart/Dumb split**: Containers handle logic and state. Components just render. No 2000-line files.
- **Testability**: Every use case can be tested without a UI, database, or Wails runtime.
- **Screaming architecture**: The folder structure screams "Task Manager" — not "React + Wails + TypeScript".

---

## Getting Started

### Prerequisites

- [Go](https://go.dev/doc/install) 1.21+
- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/installation)
- [Wails CLI](https://wails.io/docs/gettingstarted/installation) (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)
- [Wails system dependencies](https://wails.io/docs/gettingstarted/linux) for your Linux distribution

### Installation

```bash
# Clone the repository
git clone https://github.com/Gabo-Dev/GBot.git
cd GBot

# Install frontend dependencies
cd frontend && pnpm install && cd ..

# Start the development server
wails dev -tags webkit2_41
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `wails dev` | Start full Wails app in development mode |
| `wails dev -tags webkit2_41` | Dev mode with WebKit2GTK 4.1 (Linux) |
| `wails build` | Build native binary |
| `wails build -tags webkit2_41` | Build with WebKit2GTK 4.1 (Linux) |
| `pnpm --prefix frontend dev` | Start Vite dev server (frontend only) |
| `pnpm --prefix frontend test` | Run test suite |
| `pnpm --prefix frontend lint` | Run ESLint |
| `pnpm --prefix frontend typecheck` | Run TypeScript type checking |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+B+R` | Open / show GBot (global) |
| `Shift+R+B` | Close / hide GBot (global) |
| `Ctrl+Shift+J` | Toggle GBot (fallback global) |
| `Enter` | Save task in input |
| `Escape` | Cancel editing / close panel |
| `Ctrl+K` | Focus quick search |
| `Tab` / `Shift+Tab` | Navigate between task actions |
| `Space` | Toggle selected task completion |
| `Delete` | Delete selected task (with confirmation) |

---

## AI Integration

GBot uses **GitHub Models** as its AI provider, authenticated via GitHub's **Device Flow**:

1. Open GBot for the first time
2. GBot requests a device code from GitHub OAuth
3. You receive a code: `XXXX-XXXX`
4. Enter it at `github.com/login/device`
5. GBot polls for the token and stores it in your OS native keychain
6. Done — all subsequent calls are automatic

The architecture is designed to start with a single AI agent and scale to a multi-agent system capable of file exploration, research, and deeper task analysis in future versions.

---

## Development Principles

- **TDD** — Red-Green-Refactor cycle for every feature. No test = not done.
- **TypeScript Strict** — No `any`, no escape hatches. Type safety is non-negotiable.
- **Vertical Slice Hexagonal** — Each feature is a self-contained hexagon. Group by business domain, not technical layer.
- **Container/Presentational** — Smart components handle logic and state. Dumb components only render. No 2000-line files.
- **Composition over Context** — Prefer React composition with `children`. Context only for truly global state.
- **Functional Core** — Pure functions in the domain layer. Side effects live in adapters.
- **Screaming Architecture** — The folder structure should scream "Task Manager", not "React + Wails".
- **Conventional Commits** — Every commit tells a story.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built following the principles from [The Amazing Gentleman Programming Book](https://the-amazing-gentleman-programming-book.vercel.app/)
- AI powered by [GitHub Models](https://github.com/marketplace/models)
- Desktop framework by [Wails](https://wails.io/)

---

*Built with ❤️ by [Gabo-Dev](https://github.com/Gabo-Dev)*
