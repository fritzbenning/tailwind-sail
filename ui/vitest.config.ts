import path from "node:path";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [solid({ ssr: false })],
	resolve: {
		alias: {
			"@ext": path.resolve(__dirname, "../src/tailwind"),
			"@css": path.resolve(__dirname, "../src/theme/shared"),
		},
	},
	test: {
		environment: "happy-dom",
		include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
		setupFiles: ["./vitest.setup.ts"],
	},
});
