import * as assert from "assert";
import { getStyleLangValue } from "./getStyleLangValue";

suite("getStyleLangValue", () => {
	test("reads double-quoted lang", () => {
		assert.strictEqual(getStyleLangValue('<style lang="scss">'), "scss");
	});

	test("reads single-quoted lang", () => {
		assert.strictEqual(getStyleLangValue("<style lang='PostCSS'>"), "postcss");
	});

	test("reads bare lang token", () => {
		assert.strictEqual(getStyleLangValue("<style lang=scss>"), "scss");
	});

	test("returns empty string when lang is absent", () => {
		assert.strictEqual(getStyleLangValue("<style scoped>"), "");
		assert.strictEqual(getStyleLangValue("<style>"), "");
	});

	test("trims whitespace around extracted lang", () => {
		assert.strictEqual(getStyleLangValue('<style lang="  scss  ">'), "scss");
	});
});
