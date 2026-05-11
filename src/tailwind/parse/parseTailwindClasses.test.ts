import * as assert from "assert";
import { parseTailwindClasses } from "./parseTailwindClasses";

suite("parseTailwindClasses", () => {
	test("sets isTailwind", () => {
		const ok = parseTailwindClasses("p-4 foo");
		assert.strictEqual(ok.isTailwind, true);
		const no = parseTailwindClasses("hello world");
		assert.strictEqual(no.isTailwind, false);
	});

	test("records token offsets in raw string", () => {
		const r = parseTailwindClasses("  p-4   m-2 ");
		assert.strictEqual(r.classes.length, 2);
		assert.strictEqual(r.classes[0]!.name, "p-4");
		assert.strictEqual(r.classes[0]!.startInRaw, 2);
		assert.strictEqual(r.classes[0]!.endInRaw, 5);
		assert.strictEqual(r.classes[1]!.name, "m-2");
		assert.strictEqual(r.classes[1]!.startInRaw, 8);
		assert.strictEqual(r.classes[1]!.endInRaw, 11);
	});
});
