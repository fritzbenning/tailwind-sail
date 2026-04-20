# Contributing

This repository is a **pnpm workspace**: the VS Code extension lives at the root, and the sidebar UI is the `ui` package (SolidJS + Vite + Tailwind). For UI-specific scripts and stack details, see [ui/README.md](ui/README.md).

## Build and run

From the repository root:

```bash
pnpm install
pnpm run compile
```

**Run the extension** — Open this folder in VS Code and start **Run Extension** (F5). The default build task runs TypeScript in watch mode; run `pnpm run compile` once so `dist/ui` exists before the first launch, or after UI changes if you are not rebuilding the UI separately.

## Quality checks

```bash
pnpm run lint
pnpm test
```
