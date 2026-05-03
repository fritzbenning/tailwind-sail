import * as assert from "assert";
import { variantBucketMatchesSelection } from "./variantBucketMatchesSelection";

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
