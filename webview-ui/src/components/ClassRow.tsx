import { createEffect, createSignal } from 'solid-js';
import type { SailWebviewClassItem, SailWebviewPanelModel } from '@sail/protocol';
import { IconTrash } from './Icons';
import {
	effectiveVariantState,
	stripMatchingVariantPrefixesForDisplay,
	type ClientFilterState,
} from '../matchClasses';
import { vscode } from '../vscode';
import './class-token-input.css';
import './ClassRow.css';

export function ClassRow(props: {
	item: SailWebviewClassItem;
	panel: SailWebviewPanelModel;
	filter: ClientFilterState;
	visible: boolean;
}) {
	const variantEff = () => effectiveVariantState(props.panel, props.filter.variant);

	const displayWhenBlurred = () =>
		props.filter.hideMatchingVariantPrefixes
			? stripMatchingVariantPrefixesForDisplay(props.item.fullClass, variantEff())
			: props.item.fullClass;

	const [focused, setFocused] = createSignal(false);
	const [draft, setDraft] = createSignal(props.item.fullClass);

	createEffect(() => {
		if (!focused()) {
			setDraft(props.item.fullClass);
		}
	});

	const shownValue = () => (focused() ? draft() : displayWhenBlurred());

	return (
		<li
			class={`class-row${props.item.editable ? ' class-row--editable' : ''}`}
			data-sail-semantic={props.item.semantic}
			hidden={!props.visible}
		>
			<span class="class-row-class-dot" aria-hidden="true">
				.
			</span>
			{props.item.editable ? (
				<div class="class-row-line">
					<input
						type="text"
						class="class-token-input"
						spellcheck={false}
						data-token-index={props.item.tokenIndex}
						value={shownValue()}
						onFocus={() => {
							setFocused(true);
							setDraft(props.item.fullClass);
						}}
						onBlur={() => {
							setFocused(false);
						}}
						onInput={(e) => {
							const v = e.currentTarget.value;
							setDraft(v);
							vscode.postMessage({
								type: 'sailEditClass',
								tokenIndex: props.item.tokenIndex,
								newValue: v,
							});
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === 'Escape') {
								e.preventDefault();
								(e.target as HTMLInputElement).blur();
							}
						}}
					/>
					<div class="class-row-remove-wrap">
						<button
							type="button"
							class="class-row-remove"
							tabIndex={-1}
							data-token-index={props.item.tokenIndex}
							aria-label="Remove this class"
							title="Remove class"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								vscode.postMessage({ type: 'sailRemoveClass', tokenIndex: props.item.tokenIndex });
							}}
						>
							<IconTrash />
						</button>
					</div>
				</div>
			) : (
				<span class="name">{displayWhenBlurred()}</span>
			)}
		</li>
	);
}
