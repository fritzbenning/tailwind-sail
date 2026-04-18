import { VARIANT_IDS, CONTAINER_BASE_FILTER_VALUE, classifyVariantModifier, } from '@ext/filter';
import { splitTailwindClassVariants } from '@ext/variants/splitTailwindClassVariants';
export function emptyVariantFilterState() {
    const o = {};
    for (const id of VARIANT_IDS) {
        o[id] = 'all';
    }
    return o;
}
export function defaultClientFilterState() {
    return {
        semantic: { t: 'all' },
        variant: emptyVariantFilterState(),
        classSearch: '',
        hideMatchingVariantPrefixes: false,
    };
}
function shouldStripVariantModifier(sel, dimension, key) {
    if (sel === 'all') {
        return false;
    }
    if (dimension === 'state' && sel === 'idle') {
        return false;
    }
    if (dimension === 'breakpoints' && sel === 'base') {
        return false;
    }
    if (dimension === 'container' && sel === CONTAINER_BASE_FILTER_VALUE) {
        return false;
    }
    return sel === key;
}
export function stripMatchingVariantPrefixesForDisplay(fullClass, variantEff) {
    const trimmed = fullClass.trim();
    if (!trimmed) {
        return fullClass;
    }
    const { modifiers, utility } = splitTailwindClassVariants(trimmed);
    const kept = [];
    for (const mod of modifiers) {
        const { dimension, key } = classifyVariantModifier(mod);
        const sel = variantEff[dimension] ?? 'all';
        if (shouldStripVariantModifier(sel, dimension, key)) {
            continue;
        }
        kept.push(mod);
    }
    return kept.join('') + utility;
}
export function presentVariantDimensions(panel) {
    return new Set(panel.variantRows.map((r) => r.dimension));
}
export function effectiveSemanticFilter(panel, st) {
    if (panel.semanticChips.length === 0) {
        return { t: 'all' };
    }
    return st;
}
export function effectiveVariantState(panel, variantSt) {
    const rows = presentVariantDimensions(panel);
    const out = emptyVariantFilterState();
    for (const id of VARIANT_IDS) {
        out[id] = rows.has(id) ? (variantSt[id] ?? 'all') : 'all';
    }
    return out;
}
export function rowMatchesSemanticFilter(item, st) {
    if (st.t === 'all') {
        return true;
    }
    if (st.t === 'semantic') {
        return item.semantic === st.v;
    }
    return true;
}
export function rowMatchesClassSearch(item, queryTrimmedLower) {
    if (queryTrimmedLower.length === 0) {
        return true;
    }
    return item.fullClass.toLowerCase().includes(queryTrimmedLower);
}
export function rowMatchesVariantFilters(item, variantEff, panel) {
    const rows = presentVariantDimensions(panel);
    const buckets = item.variantBuckets;
    for (const dim of VARIANT_IDS) {
        if (!rows.has(dim)) {
            continue;
        }
        const sel = variantEff[dim] ?? 'all';
        if (sel === 'all') {
            continue;
        }
        const arr = buckets[dim] ?? [];
        if (dim === 'state' && sel === 'idle') {
            if (arr.length !== 0) {
                return false;
            }
            continue;
        }
        if (dim === 'theme' && sel === 'light') {
            if (arr.includes('dark')) {
                return false;
            }
            continue;
        }
        if (dim === 'breakpoints' && sel === 'base') {
            if (arr.length !== 0) {
                return false;
            }
            continue;
        }
        if (dim === 'container' && sel === CONTAINER_BASE_FILTER_VALUE) {
            if (arr.length !== 0) {
                return false;
            }
            continue;
        }
        if (!arr.includes(sel)) {
            return false;
        }
    }
    return true;
}
export function filterStateIsAvailable(panel, st) {
    const semantic = st.semantic;
    if (semantic.t === 'all') {
        /* ok */
    }
    else if (semantic.t === 'semantic') {
        const ok = panel.semanticChips.some((c) => c.id === semantic.v);
        if (!ok) {
            return false;
        }
    }
    else {
        return false;
    }
    for (const row of panel.variantRows) {
        const sel = st.variant[row.dimension] ?? 'all';
        if (sel === 'all') {
            continue;
        }
        if (!row.values.includes(sel)) {
            return false;
        }
    }
    return true;
}
export function classItemVisible(item, panel, st) {
    const semEff = effectiveSemanticFilter(panel, st.semantic);
    const varEff = effectiveVariantState(panel, st.variant);
    const q = st.classSearch.trim().toLowerCase();
    return (rowMatchesSemanticFilter(item, semEff) &&
        rowMatchesVariantFilters(item, varEff, panel) &&
        rowMatchesClassSearch(item, q));
}
export function anyClassVisible(panel, st) {
    if (panel.classes.length === 0) {
        return false;
    }
    return panel.classes.some((c) => classItemVisible(c, panel, st));
}
//# sourceMappingURL=matchClasses.js.map