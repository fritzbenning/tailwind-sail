import * as assert from "assert";
import { offsetStrictlyInsideNode } from "./offsetStrictlyInsideNode";

suite("offsetStrictlyInsideNode", () => {
	test("returns true for offsets on [start, end)", () => {
		const node = {
			source: { start: { offset: 10 }, end: { offset: 50 } },
		};
		assert.strictEqual(offsetStrictlyInsideNode(node, 10), true);
		assert.strictEqual(offsetStrictlyInsideNode(node, 49), true);
	});

	test("returns false at end boundary", () => {
		const node = {
			source: { start: { offset: 10 }, end: { offset: 50 } },
		};
		assert.strictEqual(offsetStrictlyInsideNode(node, 50), false);
	});

	test("returns false before start", () => {
		const node = {
			source: { start: { offset: 10 }, end: { offset: 50 } },
		};
		assert.strictEqual(offsetStrictlyInsideNode(node, 9), false);
	});

	test("returns false when start offset is missing", () => {
		const node = { source: { end: { offset: 5 } } };
		assert.strictEqual(offsetStrictlyInsideNode(node, 0), false);
	});

	test("returns false when end offset is missing", () => {
		const node = { source: { start: { offset: 0 } } };
		assert.strictEqual(offsetStrictlyInsideNode(node, 0), false);
	});

	test("returns false when source is absent", () => {
		assert.strictEqual(offsetStrictlyInsideNode({}, 0), false);
	});
});
