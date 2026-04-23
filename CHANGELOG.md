# Change Log

## [0.1.6] - 2026-04-23

### New features

- **Theme (CSS custom properties)**: Setting **`tailwind-sail.variables.sourceFiles`** lists workspace `.css` files whose custom properties (`--name: value`) are extracted and shown in a **Theme** tab in the sidebar. Commands **Tailwind Sail: Add Current File to Theme Files** and **Tailwind Sail: Remove Current File from Theme Files** maintain that list. Variables can be opened from the UI for quicker navigation.
- **Color and value preview**: Setting **`tailwind-sail.showUtilityPreview`** (default **on**) shows **color swatches** next to classes when the utility resolves to a color, and **raw value hints** (including pixel/length and other resolved values) when a color swatch is not used—so you see the effective color or numeric CSS at a glance. Turn the setting off for a denser class list.

## [0.1.5] - 2026-04-23

### Documentation

- README: added a demo video.

## [0.1.4] - 2026-04-22

### Fixed

- Sidebar class field lost focus after each keystroke while editing.

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
