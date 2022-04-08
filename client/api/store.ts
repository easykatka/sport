import { makeAutoObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { UserDto } from 'shared/types/user';

export type StoreType = {
    user: UserDto | null;
};

enableStaticRendering(typeof window === 'undefined');

let store;

class Store {
    user = null;
    constructor() {
        makeAutoObservable(this);
    }

    hydrate = async (initialState) => {
        if (!initialState) return;
        runInAction(() => {
            this.user = initialState.user;
            console.log('logged user: ', this.user);
        });
    };
}

export function initializeStore(initialState = null) {
    const _store = store ?? new Store();
    _store.hydrate(initialState);
    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;
    return _store;
}
