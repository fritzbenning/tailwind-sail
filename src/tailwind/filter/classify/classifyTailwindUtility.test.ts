import * as assert from "assert";
import { normalizeClass } from "../../utils/normalizeClass";
import { classifyTailwindUtility } from "./classifyTailwindUtility";

suite("classifyTailwindUtility", () => {
	test("classifies text (font, decoration)", () => {
		assert.strictEqual(classifyTailwindUtility("text-sm"), "text");
		assert.strictEqual(classifyTailwindUtility("text-center"), "text");
		assert.strictEqual(classifyTailwindUtility("font-bold"), "text");
		assert.strictEqual(classifyTailwindUtility("leading-6"), "text");
		assert.strictEqual(classifyTailwindUtility("tracking-wide"), "text");
		assert.strictEqual(classifyTailwindUtility("underline"), "text");
		assert.strictEqual(classifyTailwindUtility("decoration-dotted"), "text");
	});

	test("classifies flex and grid", () => {
		assert.strictEqual(classifyTailwindUtility("flex"), "flex");
		assert.strictEqual(classifyTailwindUtility("inline-flex"), "flex");
		assert.strictEqual(classifyTailwindUtility("flex-1"), "flex");
		assert.strictEqual(classifyTailwindUtility("justify-center"), "flex");
		assert.strictEqual(classifyTailwindUtility("gap-4"), "flex");
		assert.strictEqual(classifyTailwindUtility("grid"), "grid");
		assert.strictEqual(classifyTailwindUtility("inline-grid"), "grid");
		assert.strictEqual(classifyTailwindUtility("col-span-2"), "grid");
		assert.strictEqual(classifyTailwindUtility("grid-cols-3"), "grid");
	});

	test("classifies layout (position, overflow, display tokens)", () => {
		assert.strictEqual(classifyTailwindUtility("relative"), "layout");
		assert.strictEqual(classifyTailwindUtility("sticky"), "layout");
		assert.strictEqual(classifyTailwindUtility("absolute"), "layout");
		assert.strictEqual(classifyTailwindUtility("fixed"), "layout");
		assert.strictEqual(classifyTailwindUtility("static"), "layout");
		assert.strictEqual(classifyTailwindUtility("top-4"), "layout");
		assert.strictEqual(classifyTailwindUtility("left-0"), "layout");
		assert.strictEqual(classifyTailwindUtility("inset-0"), "layout");
		assert.strictEqual(classifyTailwindUtility("inset-x-4"), "layout");
		assert.strictEqual(classifyTailwindUtility("start-2"), "layout");
		assert.strictEqual(classifyTailwindUtility("z-10"), "layout");
		assert.strictEqual(classifyTailwindUtility("isolate"), "layout");
		assert.strictEqual(classifyTailwindUtility("inline"), "layout");
		assert.strictEqual(classifyTailwindUtility("container"), "layout");
		assert.strictEqual(classifyTailwindUtility("aspect-video"), "layout");
	});

	test("classifies size and spacing", () => {
		assert.strictEqual(classifyTailwindUtility("w-full"), "size");
		assert.strictEqual(classifyTailwindUtility("min-w-0"), "size");
		assert.strictEqual(classifyTailwindUtility("max-w-prose"), "size");
		assert.strictEqual(classifyTailwindUtility("max-h-screen"), "size");
		assert.strictEqual(classifyTailwindUtility("h-dvh"), "size");
		assert.strictEqual(classifyTailwindUtility("size-full"), "size");
		assert.strictEqual(classifyTailwindUtility("p-4"), "spacing");
		assert.strictEqual(classifyTailwindUtility("space-x-4"), "spacing");
	});

	test("classifies border, background, effect", () => {
		assert.strictEqual(classifyTailwindUtility("border-t"), "border");
		assert.strictEqual(classifyTailwindUtility("rounded-lg"), "border");
		assert.strictEqual(classifyTailwindUtility("ring-2"), "border");
		assert.strictEqual(classifyTailwindUtility("outline-none"), "border");
		assert.strictEqual(classifyTailwindUtility("divide-y"), "border");
		assert.strictEqual(classifyTailwindUtility("bg-red-500"), "background");
		assert.strictEqual(classifyTailwindUtility("from-blue-400"), "background");
		assert.strictEqual(classifyTailwindUtility("mix-blend-multiply"), "effect");
		assert.strictEqual(classifyTailwindUtility("bg-blend-multiply"), "effect");
		assert.strictEqual(classifyTailwindUtility("shadow-md"), "effect");
		assert.strictEqual(classifyTailwindUtility("drop-shadow-lg"), "effect");
		assert.strictEqual(classifyTailwindUtility("opacity-50"), "effect");
	});

	test("classifies table utilities (edge cases over border- prefix)", () => {
		assert.strictEqual(classifyTailwindUtility("border-collapse"), "table");
		assert.strictEqual(classifyTailwindUtility("border-separate"), "table");
		assert.strictEqual(classifyTailwindUtility("border-spacing-4"), "table");
		assert.strictEqual(classifyTailwindUtility("table-auto"), "table");
		assert.strictEqual(classifyTailwindUtility("table-fixed"), "table");
	});

	test("classifies interactivity and content edge cases", () => {
		assert.strictEqual(
			classifyTailwindUtility("cursor-pointer"),
			"interactivity",
		);
		assert.strictEqual(classifyTailwindUtility("select-none"), "interactivity");
		assert.strictEqual(
			classifyTailwindUtility("pointer-events-none"),
			"interactivity",
		);
		assert.strictEqual(classifyTailwindUtility("touch-none"), "interactivity");
		assert.strictEqual(
			classifyTailwindUtility("highlight-outline-2"),
			"interactivity",
		);
		assert.strictEqual(classifyTailwindUtility("focus-none"), "interactivity");
		assert.strictEqual(classifyTailwindUtility("resize-y"), "interactivity");
		assert.strictEqual(classifyTailwindUtility("snap-start"), "interactivity");
		assert.strictEqual(classifyTailwindUtility("content-none"), "text");
		assert.strictEqual(classifyTailwindUtility("content-['x']"), "text");
		assert.strictEqual(classifyTailwindUtility("content-start"), "flex");
	});

	test("classifies motion", () => {
		assert.strictEqual(classifyTailwindUtility("transition"), "motion");
		assert.strictEqual(classifyTailwindUtility("duration-200"), "motion");
		assert.strictEqual(classifyTailwindUtility("animate-spin"), "motion");
	});

	test("classifies filter and backdrop utilities", () => {
		assert.strictEqual(classifyTailwindUtility("brightness-75"), "filter");
		assert.strictEqual(classifyTailwindUtility("blur-sm"), "filter");
		assert.strictEqual(classifyTailwindUtility("backdrop-blur-md"), "filter");
		assert.strictEqual(classifyTailwindUtility("filter-none"), "filter");
	});

	test("classifies transform utilities", () => {
		assert.strictEqual(classifyTailwindUtility("translate-x-4"), "transform");
		assert.strictEqual(classifyTailwindUtility("scale-95"), "transform");
		assert.strictEqual(classifyTailwindUtility("rotate-3"), "transform");
		assert.strictEqual(classifyTailwindUtility("skew-x-6"), "transform");
		assert.strictEqual(classifyTailwindUtility("origin-center"), "transform");
	});

	test("matches like the webview after canonical prep", () => {
		const c = (raw: string) => classifyTailwindUtility(normalizeClass(raw));
		assert.strictEqual(c("!flex"), "flex");
		assert.strictEqual(c("-mx-4"), "spacing");
		assert.strictEqual(c("!Text-SM"), "text");
	});

	test("falls back to others", () => {
		assert.strictEqual(
			classifyTailwindUtility("some-unknown-plugin-foo"),
			"others",
		);
		assert.strictEqual(classifyTailwindUtility(""), "others");
	});
});
