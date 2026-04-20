import * as assert from "assert";
import {
	shouldStripModifierForVariantFilter,
	variantBucketMatchesSelection,
} from "./variantFilterSelection";

suite("variantBucketMatchesSelection", () => {
	test("state idle matches empty bucket only", () => {
		assert.strictEqual(
			variantBucketMatchesSelection("state", "idle", []),
			true,
		);
		assert.strictEqual(
			variantBucketMatchesSelection("state", "idle", ["hover"]),
			false,
		);
	});

	test("theme light matches when dark is absent", () => {
		assert.strictEqual(
			variantBucketMatchesSelection("theme", "light", []),
			true,
		);
		assert.strictEqual(
			variantBucketMatchesSelection("theme", "light", ["dark"]),
			false,
		);
	});

	test("breakpoints base matches empty bucket only", () => {
		assert.strictEqual(
			variantBucketMatchesSelection("breakpoints", "base", []),
			true,
		);
		assert.strictEqual(
			variantBucketMatchesSelection("breakpoints", "base", ["md"]),
			false,
		);
	});

	test("container base matches empty bucket only", () => {
		assert.strictEqual(
			variantBucketMatchesSelection("container", "base", []),
			true,
		);
		assert.strictEqual(
			variantBucketMatchesSelection("container", "base", ["@md"]),
			false,
		);
	});

	test("non-synthetic selection requires key in bucket", () => {
		assert.strictEqual(
			variantBucketMatchesSelection("state", "hover", ["hover"]),
			true,
		);
		assert.strictEqual(
			variantBucketMatchesSelection("state", "hover", []),
			false,
		);
		assert.strictEqual(
			variantBucketMatchesSelection("theme", "dark", ["dark"]),
			true,
		);
	});
});

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
