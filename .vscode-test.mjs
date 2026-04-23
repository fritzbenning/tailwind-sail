import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@vscode/test-cli";

const repoRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	tests: [
		{
			files: "out/**/*.test.js",
			mocha: {
				timeout: 30_000,
			},
			// So `workspace.workspaceFolders` and workspace-scoped settings work in tests
			workspaceFolder: repoRoot,
		},
	],
});
