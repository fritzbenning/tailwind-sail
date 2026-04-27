# Tailwind Sail

**Tailwind Sail** gives you a sidebar panel that displays the content of Tailwind class strings in a much more accessible way. You can filter classes by utility, state, or breakpoint to see which styles are applied for specific variants. You can even edit them or add new classes directly. This is handy in particular for very long class strings. In addition Tailwind Sail includes previews for colors and pixel-related classes. You can add your Tailwind v4 theme file to get even a preview for custom colors or overrides of the default Tailwind values.

![Tailwind Sail](assets/tailwind-sail-thumbnail.jpg)

Just give it a shot, it could be absolutely worth it. If not, I appreciate your feedback a lot. Just drop a [github issue](https://github.com/fritzbenning/tailwind-sail/issues) or send me a [dm](https://x.com/fritzbenning). And if you're really enjoying it, it would be awesome if you consider to leave a star for the [github repo](https://github.com/fritzbenning/tailwind-sail).

![Tailwind Sail demo](assets/tailwind-sail-demo.gif)

Higher quality: [Video (MP4)](https://github.com/fritzbenning/tailwind-sail/blob/main/assets/tailwind-sail-demo.mp4)

## Add theme files

To show previews for your own palette, spacing, and other theme values, point Tailwind Sail at the CSS file(s) where you define Tailwind v4 theme custom properties.

1. Open your theme file in the editor (it must be a `.css` file inside the workspace).
2. Run **Tailwind Sail: Add Current File to Theme Files** from the Command Palette, or set the `tailwind-sail.variables.sourceFiles` array in Settings to one or more workspace-relative paths, for example `src/app/globals.css`.

## Layout settings

Since VS Code and some third-party forks, such as Cursor, handle layouts slightly differently, Tailwind Sail provides consistent layout settings to improve the visual fit. You can adjust the sidebar padding, borders, and the spacing between the panel title and the extension content to match your preferences.

You can find the available settings and commands in the Features tab. 

## Support

If you find Tailwind Sail useful, you can [buy me a coffee](https://buymeacoffee.com/friddle) to help maintain the extension and fund new features. 

<a href="https://buymeacoffee.com/friddle" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## License

Tailwind Sail is released under the [MIT License](LICENSE).

