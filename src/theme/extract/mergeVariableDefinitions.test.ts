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
			},
			{
				name: "--a",
				value: "2",
				line: 3,
				uri: "file:///f2.css",
			},
		]);
		assert.strictEqual(out.length, 1);
		assert.strictEqual(out[0]?.name, "--a");
		assert.strictEqual(out[0]?.value, "2");
		assert.strictEqual(out[0]?.locations.length, 2);
	});

	test("sorts by name", () => {
		const out = mergeVariableDefinitions([
			{ name: "--z", value: "1", line: 1, uri: "file:///a.css" },
			{ name: "--a", value: "1", line: 1, uri: "file:///a.css" },
		]);
		assert.deepStrictEqual(
			out.map((e) => e.name),
			["--a", "--z"],
		);
	});
});
