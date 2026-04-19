# Sail UI

The **Sail** sidebar is a small **SolidJS** application bundled with **Vite** and styled with **Tailwind CSS v4** (`@tailwindcss/vite`). It is not a standalone site: the production bundle is loaded inside the extension’s webview from `dist/ui/` at the **workspace root** (see `vite.config.ts`).

## Stack

- [SolidJS](https://www.solidjs.com/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Scripts

From the **repository root** (recommended, so workspace resolution matches CI and `vscode:prepublish`):

```bash
pnpm install
pnpm --filter ui run dev    # local dev server
pnpm --filter ui run build  # production build → ../dist/ui/
pnpm --filter ui run preview
```

Or from `ui/`:

```bash
pnpm run dev
pnpm run build
pnpm run preview
```