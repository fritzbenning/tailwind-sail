import * as assert from "assert";
import { findVariableValueEndIndex } from "./findVariableValueEndIndex";
import { getVariableValue } from "./getVariableValue";

suite("findVariableValueEndIndex", () => {
	test("returns semicolon index for a simple value", () => {
		const t = "--x: 1px;";
		const start = t.indexOf(" ") + 1;
		assert.strictEqual(findVariableValueEndIndex(t, start), t.indexOf(";"));
	});

	test("returns full length when there is no semicolon", () => {
		const t = "--x: trailing";
		const start = t.indexOf(" ") + 1;
		assert.strictEqual(findVariableValueEndIndex(t, start), t.length);
	});
});

suite("getVariableValue", () => {
	test("reads a simple value until the first top-level semicolon", () => {
		const t = "--x: 1px;";
		const start = t.indexOf(" ") + 1;
		assert.strictEqual(getVariableValue(t, start), "1px");
	});

	test("ignores semicolons inside parentheses", () => {
		const t = "--x: rgb(0, 0; 0); end;";
		const start = t.indexOf(" ") + 1;
		assert.strictEqual(getVariableValue(t, start), "rgb(0, 0; 0)");
	});

	test("collapses internal whitespace to single spaces", () => {
		const t = "--x: foo\n\tbar;";
		const start = t.indexOf(" ") + 1;
		assert.strictEqual(getVariableValue(t, start), "foo bar");
	});

	test("returns the remainder when there is no terminating semicolon", () => {
		const t = "--x: trailing";
		const start = t.indexOf(" ") + 1;
		assert.strictEqual(getVariableValue(t, start), "trailing");
	});

	test("treats closing parens without a matching open as depth zero", () => {
		const t = "--x:);";
		const start = t.indexOf(":") + 1;
		assert.strictEqual(getVariableValue(t, start), ")");
	});
});
