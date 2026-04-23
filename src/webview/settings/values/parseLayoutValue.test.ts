import * as assert from "assert";
import { parseLayoutValue } from "./parseLayoutValue";

suite("parseLayoutValue", () => {
	test('"compact" maps to compact', () => {
		assert.strictEqual(parseLayoutValue("compact"), "compact");
	});

	test('"loose" maps to loose', () => {
		assert.strictEqual(parseLayoutValue("loose"), "loose");
	});

	test("undefined maps to loose", () => {
		assert.strictEqual(parseLayoutValue(undefined), "loose");
	});

	test("unexpected values map to loose", () => {
		assert.strictEqual(parseLayoutValue(""), "loose");
		assert.strictEqual(parseLayoutValue("tight"), "loose");
	});
});
