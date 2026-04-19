import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [tailwindcss(), solid()],
	resolve: {
		alias: {
			"@ext": path.resolve(__dirname, "../src/tailwind"),
		},
	},
	build: {
		outDir: path.resolve(__dirname, "../dist/webview"),
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, "src/main.tsx"),
			output: {
				entryFileNames: "index.js",
				assetFileNames: "index[extname]",
			},
		},
	},
});
