import * as assert from "assert";
import { shouldStripModifierForVariantFilter } from "./shouldStripModifierForVariantFilter";

suite("shouldStripModifierForVariantFilter", () => {
	test("never strips when selection is all", () => {
		assert.strictEqual(
			shouldStripModifierForVariantFilter("all", "state", "hover"),
			false,
		);
	});

	test("does not strip for synthetic idle / base selections", () => {
		assert.strictEqual(
			shouldStripModifierForVariantFilter("idle", "state", "hover"),
			false,
		);
		assert.strictEqual(
			shouldStripModifierForVariantFilter("base", "breakpoints", "md"),
			false,
		);
		assert.strictEqual(
			shouldStripModifierForVariantFilter("base", "container", "@md"),
			false,
		);
	});

	test("strips when selection equals classified modifier key", () => {
		assert.strictEqual(
			shouldStripModifierForVariantFilter("hover", "state", "hover"),
			true,
		);
		assert.strictEqual(
			shouldStripModifierForVariantFilter("hover", "state", "focus"),
			false,
		);
		assert.strictEqual(
			shouldStripModifierForVariantFilter("dark", "theme", "dark"),
			true,
		);
	});

	test("theme has no synthetic strip exemption; uses equality like other dimensions", () => {
		assert.strictEqual(
			shouldStripModifierForVariantFilter("light", "theme", "light"),
			true,
		);
		assert.strictEqual(
			shouldStripModifierForVariantFilter("light", "theme", "dark"),
			false,
		);
	});
});
