import { makeAutoObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { User as UserEntity } from 'server/modules/user/user.entity';

enableStaticRendering(typeof window === 'undefined');
export interface IStore {
	user: UserEntity | null;
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
		return this.user?.roles?.some(({ role }) => role?.name === 'admin');
	}

	toggleShowSidebar = () => (this.showSidebar = !this.showSidebar);

	hydrate = async (initialState) => {
		runInAction(() => {
			if (!initialState) return;
			this.user = initialState.user;
			// typeof window !== 'undefined' && console.log('logged user: ', this.user);
		})
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
