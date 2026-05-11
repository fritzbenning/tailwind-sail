import * as assert from "assert";
import { parseStyleContent } from "./parseStyleContent";

suite("parseStyleContent", () => {
	test("parses plain CSS into a root with declarations", () => {
		const root = parseStyleContent(".x { color: red; }", false);
		assert.ok(root);
		assert.strictEqual(root!.first!.type, "rule");
	});

	test("returns undefined on malformed CSS with standard parser", () => {
		assert.strictEqual(
			parseStyleContent("not valid css {{{", false),
			undefined,
		);
	});

	test("parses nested selectors when SCSS syntax is enabled", () => {
		const scss = ".btn {\n  &:hover { color: red; }\n}";
		const root = parseStyleContent(scss, true);
		assert.ok(root);
		assert.strictEqual(root!.first!.type, "rule");
	});

	test("returns undefined when SCSS content is invalid", () => {
		assert.strictEqual(parseStyleContent("{ {{{", true), undefined);
	});
});
