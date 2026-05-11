import * as assert from "assert";
import { findStyleTagContent } from "./findStyleTagContent";

suite("findStyleTagContent", () => {
	test("returns inner CSS when offset is inside the block", () => {
		const doc = "<style>.x{}</style>";
		const off = doc.indexOf(".x");
		const got = findStyleTagContent(doc, off);
		assert.ok(got);
		assert.strictEqual(got!.styleContent, ".x{}");
		assert.strictEqual(got!.styleContentOffset, doc.indexOf(".x"));
		assert.strictEqual(got!.useScssSyntax, false);
	});

	test("returns whole style body when offset is in a later rule", () => {
		const doc = "<style>.x{}.y{}</style>";
		const off = doc.indexOf(".y");
		const got = findStyleTagContent(doc, off);
		assert.ok(got);
		assert.strictEqual(got!.styleContent, ".x{}.y{}");
	});

	test("uses SCSS parsing flag for lang=scss", () => {
		const doc = '<style lang="scss">.x{}</style>';
		const off = doc.indexOf(".x");
		const got = findStyleTagContent(doc, off);
		assert.ok(got);
		assert.strictEqual(got!.useScssSyntax, true);
	});

	test("uses SCSS parsing flag for lang=sass", () => {
		const doc = "<style lang=sass>.x{}</style>";
		const got = findStyleTagContent(doc, doc.indexOf(".x"));
		assert.ok(got);
		assert.strictEqual(got!.useScssSyntax, true);
	});

	test("returns undefined outside any style block", () => {
		assert.strictEqual(findStyleTagContent("<div></div>", 3), undefined);
	});

	test("returns undefined when offset is on the open tag markup", () => {
		const doc = "<style>.x{}</style>";
		assert.strictEqual(
			findStyleTagContent(doc, doc.indexOf("<style")),
			undefined,
		);
	});

	test("returns undefined when offset is on the close tag", () => {
		const doc = "<style>.x{}</style>";
		assert.strictEqual(
			findStyleTagContent(doc, doc.indexOf("</style>")),
			undefined,
		);
	});

	test("returns undefined when there is no closing tag", () => {
		const doc = "<style>.x{}";
		assert.strictEqual(findStyleTagContent(doc, doc.indexOf(".x")), undefined);
	});

	test("matches later style blocks by offset", () => {
		const doc = "<style>.a{}</style><style>.b{}</style>";
		const off = doc.indexOf(".b");
		const got = findStyleTagContent(doc, off);
		assert.ok(got);
		assert.strictEqual(got!.styleContent, ".b{}");
	});

	test("returns undefined when document has no style tag", () => {
		assert.strictEqual(findStyleTagContent("plain text", 0), undefined);
	});
});
