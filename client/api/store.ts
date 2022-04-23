import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { UserDto } from 'shared/types/UserDto';
enableStaticRendering(typeof window === 'undefined');
export interface IStore {
    user: UserDto | null;
    showSidebar: boolean;
    toggleShowSidebar: () => void;
    hasAdminAccess: boolean;
}

class Store {
    user = null;
    showSidebar = true;
    constructor() {
        makeAutoObservable(this);
    }
    get hasAdminAccess() {
        return true;
        return Boolean(this.user?.roles?.find((role) => role.name === 'admin'));
    }

    toggleShowSidebar = () => (this.showSidebar = !this.showSidebar);

    hydrate = async (initialState) => {
        if (!initialState) return;
        this.user = initialState.user;
        typeof window !== 'undefined' && console.log('logged user: ', this.user);
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
