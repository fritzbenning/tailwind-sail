import * as assert from 'assert';
import { CONTAINER_BASE_FILTER_VALUE } from '../constants';
import { sortContainerChipKeys } from './sortContainerChipKeys';

suite('sortContainerChipKeys', () => {
	test('places base first then locale order', () => {
		assert.deepStrictEqual(sortContainerChipKeys(['@md', CONTAINER_BASE_FILTER_VALUE]), [
			CONTAINER_BASE_FILTER_VALUE,
			'@md',
		]);
	});

	test('sorts remaining keys when base is absent', () => {
		assert.deepStrictEqual(sortContainerChipKeys(['@lg', '@md']), ['@lg', '@md']);
	});
});
