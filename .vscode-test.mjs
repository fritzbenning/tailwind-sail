import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
	tests: [
		{
			files: "out/**/*.test.js",
			mocha: {
				timeout: 30_000,
			},
		},
	],
});
