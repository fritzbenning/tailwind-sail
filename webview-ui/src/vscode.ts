export interface VsCodeApi {
	postMessage(message: unknown): void;
}

declare global {
	function acquireVsCodeApi(): VsCodeApi;
}

export const vscode: VsCodeApi = acquireVsCodeApi();
