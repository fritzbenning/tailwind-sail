import { describe, expect, it } from "vitest";
import {
	getRadiusBorderRingThemeVariableCandidates,
	tryBuiltinRadiusBorderRingPx,
} from "./getRadiusBorderRingThemeVariableCandidates";

describe("getRadiusBorderRingThemeVariableCandidates", () => {
	it("maps rounded utilities to --radius-*", () => {
		expect(getRadiusBorderRingThemeVariableCandidates("rounded-lg")).toEqual([
			"--radius-lg",
		]);
		expect(getRadiusBorderRingThemeVariableCandidates("rounded-t-lg")).toEqual([
			"--radius-lg",
		]);
		expect(getRadiusBorderRingThemeVariableCandidates("rounded")).toEqual([
			"--radius",
			"--radius-DEFAULT",
			"--radius-sm",
		]);
	});

	it("maps border width utilities to --border-width-*", () => {
		expect(getRadiusBorderRingThemeVariableCandidates("border-2")).toEqual([
			"--border-width-2",
		]);
		expect(getRadiusBorderRingThemeVariableCandidates("border-t-4")).toEqual([
			"--border-width-4",
		]);
		expect(getRadiusBorderRingThemeVariableCandidates("border")).toEqual([
			"--default-border-width",
			"--border-width-DEFAULT",
			"--border-width",
		]);
	});

	it("skips border colors", () => {
		expect(getRadiusBorderRingThemeVariableCandidates("border-red-500")).toEqual(
			[],
		);
	});

	it("maps ring and ring-offset", () => {
		expect(getRadiusBorderRingThemeVariableCandidates("ring-2")).toEqual([
			"--ring-width-2",
		]);
		expect(getRadiusBorderRingThemeVariableCandidates("ring-offset-4")).toEqual([
			"--ring-offset-width-4",
			"--ring-offset-4",
		]);
	});
});

describe("tryBuiltinRadiusBorderRingPx", () => {
	it("returns default Tailwind v4-style px", () => {
		expect(tryBuiltinRadiusBorderRingPx("rounded-md")).toBe("6px");
		expect(tryBuiltinRadiusBorderRingPx("rounded-t-lg")).toBe("8px");
		expect(tryBuiltinRadiusBorderRingPx("border")).toBe("1px");
		expect(tryBuiltinRadiusBorderRingPx("border-x")).toBe("1px");
		expect(tryBuiltinRadiusBorderRingPx("border-t-2")).toBe("2px");
		expect(tryBuiltinRadiusBorderRingPx("ring")).toBe("1px");
		expect(tryBuiltinRadiusBorderRingPx("ring-4")).toBe("4px");
		expect(tryBuiltinRadiusBorderRingPx("ring-offset-2")).toBe("2px");
		expect(tryBuiltinRadiusBorderRingPx("inset-ring-2")).toBe("2px");
	});
});
