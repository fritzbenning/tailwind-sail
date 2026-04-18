import type { DebounceTimer } from './scheduleUpdate';

export interface RefreshNowParams {
	readonly debounceTimer: { current: DebounceTimer };
	readonly onFire: () => void;
}

export function refreshNow(params: RefreshNowParams): void {
	if (params.debounceTimer.current) {
		clearTimeout(params.debounceTimer.current);
		params.debounceTimer.current = undefined;
	}
	params.onFire();
}
