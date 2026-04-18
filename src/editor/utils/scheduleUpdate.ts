import * as vscode from 'vscode';

export type DebounceTimer = ReturnType<typeof setTimeout> | undefined;

export interface ScheduleUpdateParams {
	readonly debounceTimer: { current: DebounceTimer };
	readonly onFire: () => void;
}

export function scheduleUpdate(params: ScheduleUpdateParams): void {
	if (params.debounceTimer.current) {
		clearTimeout(params.debounceTimer.current);
	}
	const ms = vscode.workspace.getConfiguration('sail').get<number>('updateDebounceMs', 150);
	params.debounceTimer.current = setTimeout(() => {
		params.debounceTimer.current = undefined;
		params.onFire();
	}, Math.max(0, ms));
}
