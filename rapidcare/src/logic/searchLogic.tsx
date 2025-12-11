import { useMemo } from 'react';

export function useSearch<T>(
    items: T[],
    searchQuery: string,
    filterFn: (item: T, query: string) => boolean
) {
    const filteredItems = useMemo(() => {
        if (!searchQuery) return items;
        return items.filter(item => filterFn(item, searchQuery));
    }, [items, searchQuery, filterFn]);

    return filteredItems;
}
