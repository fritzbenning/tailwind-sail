import * as assert from "assert";
import { findSelector } from "./findSelector";

suite("findSelector", () => {
	test("parses :root", () => {
		assert.strictEqual(findSelector(":root {"), ":root");
	});

	test("parses trimmed selector", () => {
		assert.strictEqual(findSelector("  html  {"), "html");
	});
});
