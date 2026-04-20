import * as assert from "assert";
import { parseTailwindSailLayoutSetting } from "./readTailwindSailLayout";

suite("parseTailwindSailLayoutSetting", () => {
	test('"compact" maps to compact', () => {
		assert.strictEqual(parseTailwindSailLayoutSetting("compact"), "compact");
	});

	test('"loose" maps to loose', () => {
		assert.strictEqual(parseTailwindSailLayoutSetting("loose"), "loose");
	});

	test("undefined maps to loose", () => {
		assert.strictEqual(parseTailwindSailLayoutSetting(undefined), "loose");
	});

	test("unexpected values map to loose", () => {
		assert.strictEqual(parseTailwindSailLayoutSetting(""), "loose");
		assert.strictEqual(parseTailwindSailLayoutSetting("tight"), "loose");
	});
});
