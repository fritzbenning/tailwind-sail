# Change Log

All notable changes to the **tailwind-sail** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-20

### Added

- **Tailwind Sail** activity bar container and sidebar webview for browsing the active Tailwind class string.
- Detection of Tailwind utilities inside string literals at the cursor (quotes and template literals).
- Structured list of classes with search, utility filters, and variant filters.
- Inline editing workflow from the sidebar (add/remove classes) synced back into the source string.
- Commands **Tailwind Sail: Show Sidebar** and **Tailwind Sail: Refresh**.
- Settings `tailwind-sail.updateDebounceMs` and `tailwind-sail.highlightActiveString` (optional underline of the active string).
- Requires VS Code `^1.105.0`.
