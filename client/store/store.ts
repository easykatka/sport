import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

enableStaticRendering(typeof window === 'undefined');

let store;

class Store {
    xep = null;
    constructor() {
        makeAutoObservable(this);
    }

    hydrate = (data) => {
        if (!data) return;
        this.xep = '123';
    };
}

export function initializeStore(initialData = null) {
    const _store = store ?? new Store();
    if (initialData) {
        _store.hydrate(initialData);
    }
    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;
    return _store;
}
