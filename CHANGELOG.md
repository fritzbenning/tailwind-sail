# Change Log

## [0.1.8] - 2026-05-11

### New features

- **CSS/SCSS `@apply`**: Sidebar, underlines, and edits work on Tailwind utilities inside `@apply` in stylesheets. Setting **`tailwind-sail.applyAtCaretScope`** chooses whether to merge the whole rule body or only the `@apply` that contains the caret. Command **Tailwind Sail: Set @apply Scope…** changes that from the Command Palette.
- Setting **`tailwind-sail.saveDocumentAfterEdit`** (default **off**): saves the active editor after discrete Tailwind Sail edits (remove/add class, **Enter** in **Add** or a class field, named-scale steps), not while typing a token. Command **Tailwind Sail: Save Document After Edit (Toggle)** from the Command Palette, or enable it under **Tailwind Sail** in Settings.
- **Named-scale stepping**: Sidebar **chevron buttons** on each class row move the utility’s **named size or breakpoint keyword** along Tailwind’s ordered scale—for example `text-sm` → `text-base`, `rounded-md` → `rounded-lg`, `max-w-md` → `max-w-lg`—while keeping variant prefixes and `!` intact. The buttons are omitted when the utility has no recognized keyword step (for example arbitrary values or numeric-only spacing).

## [0.1.7] - 2026-04-24

### Changed

- Optimize layout.

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
