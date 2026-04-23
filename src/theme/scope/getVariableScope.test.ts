import * as assert from "assert";
import { getVariableScope } from "./getVariableScope";

suite("getVariableScope", () => {
	test("resolves :root block", () => {
		const text = ":root {\n  --x: 1px;\n}";
		const idx = text.indexOf("--x");
		assert.strictEqual(idx >= 0, true);
		assert.strictEqual(getVariableScope("/p/a.css", text, idx), ":root");
	});

	test("nested non-allowlisted block yields undefined", () => {
		const text = ":root {\n  .card {\n    --y: 2px;\n  }\n}";
		const idx = text.indexOf("--y");
		assert.strictEqual(getVariableScope("/p/a.css", text, idx), undefined);
	});

	test("skips scope for .vue extension", () => {
		const text = ":root {\n  --z: 1;\n}";
		const idx = text.indexOf("--z");
		assert.strictEqual(getVariableScope("/p/a.vue", text, idx), undefined);
	});

	test("html selector", () => {
		const text = "html {\n  --h: 1;\n}";
		const idx = text.indexOf("--h");
		assert.strictEqual(getVariableScope("/p/a.css", text, idx), "html");
	});
});
