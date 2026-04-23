import * as assert from "assert";
import { extractVariableDefinitions } from "./extractVariableDefinitions";

suite("extractVariableDefinitions", () => {
	test("aggregates per-line results for a full file", () => {
		const rows = extractVariableDefinitions(
			"/p/t.css",
			":root {\n  --brand: #f00;\n}\n",
		);
		assert.strictEqual(rows.length, 1);
		assert.strictEqual(rows[0]?.name, "--brand");
		assert.strictEqual(rows[0]?.value, "#f00");
		assert.strictEqual(rows[0]?.line, 2);
		assert.strictEqual(rows[0]?.definitionScope, ":root");
	});

	test("sees multiple definitions on the same line", () => {
		const rows = extractVariableDefinitions(
			"/p/t.css",
			"/* x */ --a: 1px; --b: 2px;",
		);
		assert.strictEqual(rows.length, 2);
		assert.strictEqual(rows[0]?.name, "--a");
		assert.strictEqual(rows[1]?.name, "--b");
	});

	test("reads values that continue on following lines until a top-level semicolon", () => {
		const rows = extractVariableDefinitions(
			"/p/t.css",
			"@theme {\n  --color-secondary:\n    hsl(var(--secondary));\n}\n",
		);
		assert.strictEqual(rows.length, 1);
		assert.strictEqual(rows[0]?.name, "--color-secondary");
		assert.strictEqual(rows[0]?.value, "hsl(var(--secondary))");
	});
});
