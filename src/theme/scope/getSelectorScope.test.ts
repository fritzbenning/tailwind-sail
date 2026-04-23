import * as assert from "assert";
import { getSelectorScope } from "./getSelectorScope";

suite("getSelectorScope", () => {
	test("allowlists :root", () => {
		assert.strictEqual(getSelectorScope(":root {"), ":root");
	});

	test("rejects class selector", () => {
		assert.strictEqual(getSelectorScope(".foo {"), undefined);
	});
});
