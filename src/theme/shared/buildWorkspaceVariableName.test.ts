import * as assert from "assert";
import { buildWorkspaceVariableName } from "./buildWorkspaceVariableName";

suite("buildWorkspaceVariableName", () => {
	test("prefixes valid token", () => {
		assert.strictEqual(
			buildWorkspaceVariableName("--brand"),
			"--workspace-brand",
		);
	});

	test("returns undefined without leading --", () => {
		assert.strictEqual(buildWorkspaceVariableName("brand"), undefined);
	});

	test("returns undefined on invalid characters", () => {
		assert.strictEqual(buildWorkspaceVariableName("--a b"), undefined);
	});
});
