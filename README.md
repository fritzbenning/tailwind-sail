# Tailwind Sail

**Tailwind Sail** is a Visual Studio Code extension that gives you a live, structured view of **Tailwind CSS** class strings in your code. Place the cursor inside a string that holds Tailwind utilities, and the **Tailwind Sail** sidebar breaks the string into tokens you can browse, filter, search, and edit—without leaving the editor.

## Commands

| Command | Description |
|--------|-------------|
| **Tailwind Sail: Show Sidebar** | Focuses the secondary side bar and opens the Tailwind Sail view. |
| **Tailwind Sail: Refresh** | Immediately re-runs extraction and parsing for the current editor. |
| **Tailwind Sail: Set Sidebar Horizontal Padding…** | Chooses **compact** or **loose** horizontal inset for the sidebar (updates `tailwind-sail.layout`). |
| **Tailwind Sail: Set Sidebar Top Padding…** | Chooses **compact** or **loose** top padding for the sidebar (updates `tailwind-sail.paddingTop`). |

## Settings

| Setting | Default | Description |
|--------|---------|-------------|
| `tailwind-sail.updateDebounceMs` | `20` | Milliseconds to wait after cursor or document changes before Tailwind Sail re-runs string detection and Tailwind parsing. |
| `tailwind-sail.highlightActiveString` | `true` | Underline the string literal Tailwind Sail is currently using. |
| `tailwind-sail.layout` | `loose` | Horizontal inset: **`loose`** (roomier) or **`compact`** (tighter). |
| `tailwind-sail.paddingTop` | `compact` | Top padding above content: **`loose`** (roomier) or **`compact`** (tighter). |

See [CONTRIBUTING.md](CONTRIBUTING.md) to build from source or contribute.

## License

Tailwind Sail is released under the [MIT License](LICENSE).

