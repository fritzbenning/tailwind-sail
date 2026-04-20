import * as assert from "assert";
import { tryExpressionBlock } from "./tryExpressionBlock";
import { tryTemplateLiteral } from "./tryTemplateLiteral";

suite("tryTemplateLiteral / tryExpressionBlock", () => {
	test("tryTemplateLiteral merges static spans when cursor in static text", () => {
		const text = "const c = `w-full ${x}grid`;";
		const open = text.indexOf("`");
		const w = text.indexOf("w");
		const r = tryTemplateLiteral(text, open, w);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, "w-full grid");
		assert.strictEqual(r.extracted!.rawToDocSegments.length, 2);
	});

	test("tryTemplateLiteral no extracted when cursor only in interpolation (no nested string)", () => {
		const text = "const c = `a ${foo} b`;";
		const open = text.indexOf("`");
		const dollar = text.indexOf("$");
		const r = tryTemplateLiteral(text, open, dollar + 2);
		assert.strictEqual(r.extracted, undefined);
		assert.strictEqual(r.end, text.lastIndexOf("`") + 1);
	});

	test("tryExpressionBlock returns nested double-quoted string when offset inside", () => {
		const text = '`x ${ "ab" } y`';
		const braceOpen = text.indexOf("{");
		const a = text.indexOf("a");
		const r = tryExpressionBlock(text, braceOpen, a);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, "ab");
	});

	test("tryExpressionBlock finishes block when cursor not in nested string", () => {
		const text = "`x ${ foo } y`";
		const braceOpen = text.indexOf("{");
		const f = text.indexOf("f");
		const r = tryExpressionBlock(text, braceOpen, f);
		assert.strictEqual(r.extracted, undefined);
		assert.strictEqual(r.end, text.indexOf("}") + 1);
	});

	test("tryExpressionBlock respects nested braces outside strings", () => {
		const text = '`${ { x: "in" } }`';
		const braceOpen = text.indexOf("{");
		const i = text.indexOf("i");
		const r = tryExpressionBlock(text, braceOpen, i);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, "in");
	});

	test("tryExpressionBlock returns nested single-quoted string when offset inside", () => {
		const text = "`x ${ 'ab' } y`";
		const braceOpen = text.indexOf("{");
		const a = text.indexOf("a");
		const r = tryExpressionBlock(text, braceOpen, a);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, "ab");
	});

	test("tryExpressionBlock ignores closing brace inside line comment", () => {
		const text = "`${ x // }\n}`";
		const braceOpen = text.indexOf("{");
		const r = tryExpressionBlock(text, braceOpen, braceOpen + 1);
		assert.strictEqual(r.extracted, undefined);
		assert.strictEqual(r.end, text.lastIndexOf("}") + 1);
	});

	test("tryExpressionBlock ignores closing brace inside block comment", () => {
		const text = "`${ x /* } */ }`";
		const braceOpen = text.indexOf("{");
		const r = tryExpressionBlock(text, braceOpen, braceOpen + 1);
		assert.strictEqual(r.extracted, undefined);
		assert.strictEqual(r.end, text.lastIndexOf("}") + 1);
	});

	test("tryExpressionBlock delegates to nested template literal", () => {
		const text = "`a ${ `in` } b`";
		const braceOpen = text.indexOf("{");
		const i = text.indexOf("i");
		const r = tryExpressionBlock(text, braceOpen, i);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, "in");
	});
});
