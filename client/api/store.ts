import { makeAutoObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { UserDto } from 'shared/types/user';
enableStaticRendering(typeof window === 'undefined');
export interface IStore {
    user: UserDto | null;
    showSidebar: boolean;
    toggleShowSidebar: () => void;
}

class Store {
    user = null;
    showSidebar = true;
    constructor() {
        makeAutoObservable(this);
    }

    toggleShowSidebar = () => (this.showSidebar = !this.showSidebar);

    hydrate = async (initialState) => {
        if (!initialState) return;
        runInAction(() => {
            this.user = initialState.user;
            console.log('logged user: ', this.user);
        });
    };
}

let store;
export function initializeStore(initialState = null) {
    const _store = store ?? new Store();
    _store.hydrate(initialState);
    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;
    return _store;
}
