import { action, makeAutoObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { fetch } from 'shared/utils/fetch';

enableStaticRendering(typeof window === 'undefined');

let store;

class Store {
    users = null;
    constructor() {
        makeAutoObservable(this);
    }

    hydrate = async () => {
        runInAction(async () => {
            this.users = await fetch(`/api/user/getAllUsers`);
        });
    };
}

export function initializeStore(initialData = null) {
    const _store = store ?? new Store();
    _store.hydrate(initialData);
    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;
    return _store;
}
