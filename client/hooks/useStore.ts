import { initializeStore } from 'client/api/store';
import { useMemo } from 'react';

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
