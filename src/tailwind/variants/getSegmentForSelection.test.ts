import * as assert from "assert";
import { getSegmentForSelection } from "./getSegmentForSelection";

suite("getSegmentForSelection", () => {
	test("returns null for all", () => {
		assert.strictEqual(getSegmentForSelection("theme", "all"), null);
	});

	test("returns null for synthetic state idle", () => {
		assert.strictEqual(getSegmentForSelection("state", "idle"), null);
		assert.strictEqual(getSegmentForSelection("state", "Idle:"), null);
		assert.strictEqual(getSegmentForSelection("state", " idle: "), null);
	});

	test("returns null for synthetic breakpoint base", () => {
		assert.strictEqual(getSegmentForSelection("breakpoints", "base"), null);
		assert.strictEqual(getSegmentForSelection("breakpoints", "Base:"), null);
		assert.strictEqual(getSegmentForSelection("breakpoints", " Base: "), null);
	});

	test("returns null for synthetic container base", () => {
		assert.strictEqual(getSegmentForSelection("container", "base"), null);
		assert.strictEqual(getSegmentForSelection("container", "Base:"), null);
		assert.strictEqual(getSegmentForSelection("container", " Base: "), null);
	});

	test("returns null for synthetic theme light chip", () => {
		assert.strictEqual(getSegmentForSelection("theme", "light"), null);
		assert.strictEqual(getSegmentForSelection("theme", "Light:"), null);
		assert.strictEqual(getSegmentForSelection("theme", " Light: "), null);
	});

	test("appends colon when missing", () => {
		assert.strictEqual(getSegmentForSelection("theme", "dark"), "dark:");
		assert.strictEqual(getSegmentForSelection("state", "hover"), "hover:");
	});

	test("preserves trimmed segment when colon already present", () => {
		assert.strictEqual(getSegmentForSelection("theme", "dark:"), "dark:");
		assert.strictEqual(getSegmentForSelection("other", "[&_svg]:"), "[&_svg]:");
	});

	test("does not treat light as synthetic on non-theme dimensions", () => {
		assert.strictEqual(getSegmentForSelection("misc", "light"), "light:");
	});
});
