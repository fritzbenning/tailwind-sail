import { cleanup } from "@solidjs/testing-library";
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

vi.stubGlobal(
	"acquireVsCodeApi",
	vi.fn(() => ({
		postMessage: vi.fn(),
	})),
);

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});
