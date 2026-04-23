import * as assert from "assert";
import { mergeVariableDefinitions } from "./mergeVariableDefinitions";

suite("mergeVariableDefinitions", () => {
	test("last value wins and locations accumulate", () => {
		const out = mergeVariableDefinitions([
			{
				name: "--a",
				value: "1",
				line: 1,
				uri: "file:///f1.css",
				valueStartOffset: 10,
				valueEndOffset: 11,
			},
			{
				name: "--a",
				value: "2",
				line: 3,
				uri: "file:///f2.css",
				valueStartOffset: 20,
				valueEndOffset: 21,
			},
		]);
		assert.strictEqual(out.length, 1);
		assert.strictEqual(out[0]?.name, "--a");
		assert.strictEqual(out[0]?.value, "2");
		assert.strictEqual(out[0]?.locations.length, 2);
		assert.strictEqual(out[0]?.locations[0]?.valueStartOffset, 10);
		assert.strictEqual(out[0]?.locations[0]?.valueEndOffset, 11);
		assert.strictEqual(out[0]?.locations[1]?.valueStartOffset, 20);
		assert.strictEqual(out[0]?.locations[1]?.valueEndOffset, 21);
	});

	test("sorts by name", () => {
		const out = mergeVariableDefinitions([
			{
				name: "--z",
				value: "1",
				line: 1,
				uri: "file:///a.css",
				valueStartOffset: 0,
				valueEndOffset: 1,
			},
			{
				name: "--a",
				value: "1",
				line: 1,
				uri: "file:///a.css",
				valueStartOffset: 0,
				valueEndOffset: 1,
			},
		]);
		assert.deepStrictEqual(
			out.map((e) => e.name),
			["--a", "--z"],
		);
	});
});
