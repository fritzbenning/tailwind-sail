import * as assert from "assert";
import * as vscode from "vscode";
import { findStyleContent } from "./findStyleContent";

suite("findStyleContent", () => {
	test("returns full document for standalone CSS", async () => {
		const css = ".x { color: red; }";
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: css,
		});
		const off = css.indexOf("red");
		const got = findStyleContent(doc, off);
		assert.ok(got);
		assert.strictEqual(got!.styleContent, css);
		assert.strictEqual(got!.styleContentOffset, 0);
		assert.strictEqual(got!.useScssSyntax, false);
	});

	test("sets SCSS parsing for scss language documents", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "scss",
			content: ".x {}",
		});
		const got = findStyleContent(doc, 0);
		assert.ok(got);
		assert.strictEqual(got!.useScssSyntax, true);
	});

	test("returns embedded style body for Vue-like documents", async () => {
		const body = "\n.a { color: red; }\n";
		const full = `<template><div /></template>\n<style>${body}</style>`;
		const doc = await vscode.workspace.openTextDocument({
			language: "vue",
			content: full,
		});
		const off = full.indexOf("color");
		const got = findStyleContent(doc, off);
		assert.ok(got);
		assert.strictEqual(got!.styleContent, body);
		assert.strictEqual(got!.styleContentOffset, full.indexOf(body));
		assert.strictEqual(
			doc.getText().slice(got!.styleContentOffset).startsWith("\n.a"),
			true,
		);
	});

	test("returns undefined outside embedded style when file is not CSS", async () => {
		const full = `<template><div class="x"></div></template>\n<style>.a{}</style>`;
		const doc = await vscode.workspace.openTextDocument({
			language: "vue",
			content: full,
		});
		const off = full.indexOf(`class="x"`);
		assert.strictEqual(findStyleContent(doc, off), undefined);
	});

	test("returns undefined for plain documents without stylesheet context", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "plaintext",
			content: "not css",
		});
		assert.strictEqual(findStyleContent(doc, 2), undefined);
	});
});
