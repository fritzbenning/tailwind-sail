import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
	it("is a presentation separator", () => {
		const { container } = render(() => <Divider />);
		const rule = container.querySelector('[role="presentation"]');
		expect(rule).toBeInTheDocument();
	});

	it("accepts marginBottom variant", () => {
		const { container } = render(() => <Divider marginBottom />);
		const rule = container.querySelector('[role="presentation"]');
		expect(rule?.className).toContain("mb-4");
	});
});
