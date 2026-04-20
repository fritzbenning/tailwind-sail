import * as assert from "assert";
import { hasTailwindClasses } from "./hasTailwindClasses";

suite("hasTailwindClasses", () => {
	test("detects tailwind-like tokens", () => {
		assert.strictEqual(hasTailwindClasses("flex gap-2"), true);
		assert.strictEqual(hasTailwindClasses("totally not css"), false);
	});
});
