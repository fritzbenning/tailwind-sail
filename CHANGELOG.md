# Change Log

## [0.1.3] - 2026-04-21

### New features

- Setting **`tailwind-sail.showSidebarRightBorder`** (default **off**): optional 1px right border on the sidebar webview for hosts where the auxiliary bar has no native separator (for example **Cursor**). VS Code users can leave it off for a cleaner edge.
- Command **Tailwind Sail: Toggle Sidebar Right Border** to flip **`tailwind-sail.showSidebarRightBorder`** from the Command Palette.

## [0.1.2] - 2026-04-20

### New features

- Setting **`tailwind-sail.layout`**: choose **Loose** or **Compact** horizontal inset for the sidebar (CSS variable `--sidebarPaddingX`).
- Setting **`tailwind-sail.paddingTop`** (default **compact**): **compact** or **loose** top padding on the sidebar body (`--sidebarPaddingTop`).
- Commands **Tailwind Sail: Set Sidebar Horizontal Padding…** and **Tailwind Sail: Set Sidebar Top Padding…** to change those options from the Command Palette.

## [0.1.0] - 2026-04-20

### New features

- **Tailwind Sail** activity bar container and sidebar webview for browsing the active Tailwind class string.
- Detection of Tailwind utilities inside string literals at the cursor (quotes and template literals).
- Structured list of classes with search, utility filters, and variant filters.
- Inline editing workflow from the sidebar (add/remove classes) synced back into the source string.
- Commands **Tailwind Sail: Show Sidebar** and **Tailwind Sail: Refresh**.
- Settings `tailwind-sail.updateDebounceMs` and `tailwind-sail.highlightActiveString` (optional underline of the active string).
