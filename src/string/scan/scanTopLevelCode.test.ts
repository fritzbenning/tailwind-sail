import * as assert from "assert";
import { scanTopLevelCode } from "./scanTopLevelCode";

suite("scanTopLevelCode", () => {
	test("returns first matching literal containing offset", () => {
		const text = 'const a = "one"; const b = "two";';
		const t = text.indexOf("two");
		const r = scanTopLevelCode(text, t);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, "two");
	});

	test("skips earlier literals that do not contain offset", () => {
		const text = '"skip" const x = "keep";';
		const k = text.indexOf("keep");
		const r = scanTopLevelCode(text, k);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, "keep");
	});
});
