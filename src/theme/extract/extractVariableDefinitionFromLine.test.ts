import * as assert from "assert";
import { extractVariableDefinitionFromLine } from "./extractVariableDefinitionFromLine";

suite("extractVariableDefinitionFromLine", () => {
	test("extracts a variable from a line with correct offset in fullText", () => {
		const fullText = ":root {\n  --brand: #f00;\n}\n";
		const line = "  --brand: #f00;";
		const lineStart = fullText.indexOf(line);
		const rows = extractVariableDefinitionFromLine(
			"/p/t.css",
			fullText,
			line,
			lineStart,
			2,
		);
		assert.strictEqual(rows.length, 1);
		assert.strictEqual(rows[0]?.name, "--brand");
		assert.strictEqual(rows[0]?.value, "#f00");
		assert.strictEqual(rows[0]?.line, 2);
		assert.strictEqual(rows[0]?.definitionScope, ":root");
	});

	test("extracts multiple declarations on one line", () => {
		const line = "/* x */ --a: 1px; --b: 2px;";
		const rows = extractVariableDefinitionFromLine(
			"/p/t.css",
			line,
			line,
			0,
			1,
		);
		assert.strictEqual(rows.length, 2);
		assert.strictEqual(rows[0]?.name, "--a");
		assert.strictEqual(rows[0]?.value, "1px");
		assert.strictEqual(rows[1]?.name, "--b");
		assert.strictEqual(rows[1]?.value, "2px");
	});

	test("reads a value that continues on following lines in fullText", () => {
		const fullText =
			"@theme {\n  --color-secondary:\n    hsl(var(--secondary));\n}\n";
		const line = "  --color-secondary:";
		const lineStart = fullText.indexOf(line);
		const rows = extractVariableDefinitionFromLine(
			"/p/t.css",
			fullText,
			line,
			lineStart,
			2,
		);
		assert.strictEqual(rows.length, 1);
		assert.strictEqual(rows[0]?.name, "--color-secondary");
		assert.strictEqual(rows[0]?.value, "hsl(var(--secondary))");
		assert.strictEqual(rows[0]?.line, 2);
	});
});
