import path from 'node:path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solid()],
	resolve: {
		alias: {
			'@ext': path.resolve(__dirname, '../src/tailwind'),
			'@sail/protocol': path.resolve(__dirname, '../src/webview/protocol.ts'),
		},
	},
	build: {
		outDir: path.resolve(__dirname, '../dist/webview'),
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, 'src/main.tsx'),
			output: {
				entryFileNames: 'index.js',
				assetFileNames: 'index[extname]',
			},
		},
	},
});
