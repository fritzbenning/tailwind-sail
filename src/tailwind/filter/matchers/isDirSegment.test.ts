import * as assert from "assert";
import { isDirSegment } from "./isDirSegment";

suite("isDirSegment", () => {
	test("matches ltr and rtl case-insensitively", () => {
		assert.strictEqual(isDirSegment("ltr"), true);
		assert.strictEqual(isDirSegment("RTL"), true);
	});

	test("rejects other segments", () => {
		assert.strictEqual(isDirSegment("md"), false);
	});
});
