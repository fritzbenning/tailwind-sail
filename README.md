# Sail

**Sail** is a Visual Studio Code extension that gives you a live, structured view of **Tailwind CSS** class strings in your code. Place the cursor inside a string that holds Tailwind utilities, and the **Sail** sidebar breaks the string into tokens you can browse, filter, search, and edit—without leaving the editor.

## Commands

| Command | Description |
|--------|-------------|
| **Sail: Show Sidebar** | Focuses the secondary side bar and opens the Sail view. |
| **Sail: Refresh** | Immediately re-runs extraction and parsing for the current editor. |

## Settings

| Setting | Default | Description |
|--------|---------|-------------|
| `sail.updateDebounceMs` | `20` | Milliseconds to wait after cursor or document changes before Sail re-runs string detection and Tailwind parsing. |
| `sail.highlightActiveString` | `true` | Underline the string literal Sail is currently using. |

## Development

This repo is a **pnpm workspace**: the VS Code extension lives at the root, and the sidebar UI is the `ui` package (SolidJS + Vite + Tailwind). See [ui/README.md](ui/README.md) for UI-specific workflows.

From the repository root:

```bash
pnpm install
pnpm run compile
```

- **Run the extension** — Open this folder in VS Code and start **Run Extension** (F5). The default build task runs TypeScript in watch mode; run `pnpm run compile` once so `dist/ui` exists before the first launch, or after UI changes if you are not rebuilding the UI separately.

```bash
pnpm run lint
pnpm test
```

