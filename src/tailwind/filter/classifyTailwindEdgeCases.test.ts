import * as assert from "assert";
import { classifyTailwindEdgeCases } from "./classifyTailwindEdgeCases";

suite("classifyTailwindEdgeCases", () => {
	test("classifies bare flex and inline-flex", () => {
		assert.strictEqual(classifyTailwindEdgeCases("flex"), "flex");
		assert.strictEqual(classifyTailwindEdgeCases("inline-flex"), "flex");
	});

	test("classifies bare grid and inline-grid", () => {
		assert.strictEqual(classifyTailwindEdgeCases("grid"), "grid");
		assert.strictEqual(classifyTailwindEdgeCases("inline-grid"), "grid");
	});

	test("classifies table layout and border model utilities", () => {
		assert.strictEqual(classifyTailwindEdgeCases("table-auto"), "table");
		assert.strictEqual(classifyTailwindEdgeCases("table-fixed"), "table");
		assert.strictEqual(classifyTailwindEdgeCases("border-collapse"), "table");
		assert.strictEqual(classifyTailwindEdgeCases("border-separate"), "table");
		assert.strictEqual(classifyTailwindEdgeCases("border-spacing-4"), "table");
		assert.strictEqual(
			classifyTailwindEdgeCases("border-spacing-x-4"),
			"table",
		);
	});

	test("classifies blend modes as effect", () => {
		assert.strictEqual(
			classifyTailwindEdgeCases("mix-blend-multiply"),
			"effect",
		);
		assert.strictEqual(
			classifyTailwindEdgeCases("bg-blend-multiply"),
			"effect",
		);
	});

	test("classifies display inline as layout", () => {
		assert.strictEqual(classifyTailwindEdgeCases("inline"), "layout");
	});

	test("classifies pseudo-element content utilities as text", () => {
		assert.strictEqual(classifyTailwindEdgeCases("content-none"), "text");
		assert.strictEqual(classifyTailwindEdgeCases("content-['x']"), "text");
	});

	test("returns undefined when the main prefix walk should decide", () => {
		assert.strictEqual(classifyTailwindEdgeCases("p-4"), undefined);
		assert.strictEqual(classifyTailwindEdgeCases("flex-1"), undefined);
		assert.strictEqual(classifyTailwindEdgeCases("content-start"), undefined);
	});
});
