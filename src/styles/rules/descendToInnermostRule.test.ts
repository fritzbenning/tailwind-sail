import * as assert from "assert";
import { parseStyleContent } from "../parse/parseStyleContent";
import { descendToInnermostRule } from "./descendToInnermostRule";

suite("descendToInnermostRule", () => {
	test("returns the innermost nested rule matching the offset", () => {
		const scss = `.outer {\n  .inner {\n    color: red;\n  }\n}\n`;
		const root = parseStyleContent(scss, true);
		assert.ok(root);
		const inner = descendToInnermostRule(root!, scss.indexOf("red"));
		assert.strictEqual(inner?.selector.trim(), ".inner");
	});

	test("returns the enclosing rule when the offset is not inside a deeper rule", () => {
		const scss = `.outer {\n  color: blue;\n  .inner {\n    color: red;\n  }\n}\n`;
		const root = parseStyleContent(scss, true);
		assert.ok(root);
		const outer = descendToInnermostRule(root!, scss.indexOf("blue"));
		assert.strictEqual(outer?.selector.trim(), ".outer");
	});

	test("picks among top-level sibling rules by offset", () => {
		const css = `.a { --x: 1;\n}\n.b { --y: 2;\n}\n`;
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const inB = descendToInnermostRule(root!, css.indexOf("--y"));
		assert.strictEqual(inB?.selector.trim(), ".b");
		const inA = descendToInnermostRule(root!, css.indexOf("--x"));
		assert.strictEqual(inA?.selector.trim(), ".a");
	});

	test("descends through an at-rule body to the innermost rule", () => {
		const css = `@layer components {\n  .btn { padding: 0;\n  }\n}\n`;
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const rule = descendToInnermostRule(root!, css.indexOf("padding"));
		assert.strictEqual(rule?.selector.trim(), ".btn");
	});

	test("returns undefined when the offset is inside an at-rule but not inside any rule", () => {
		const css = `@supports (display: grid) {\n  color: red;\n}\n`;
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const rule = descendToInnermostRule(root!, css.indexOf("red"));
		assert.strictEqual(rule, undefined);
	});

	test("returns undefined when no rule contains the offset", () => {
		const css = `/* only a comment */\n`;
		const root = parseStyleContent(css, false);
		assert.ok(root);
		const rule = descendToInnermostRule(root!, css.indexOf("comment"));
		assert.strictEqual(rule, undefined);
	});
});
