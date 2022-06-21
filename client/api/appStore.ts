import { makeAutoObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { configure } from "mobx"
import { User } from 'server/modules/user/user.entity';

configure({
	enforceActions: "never",
});

enableStaticRendering(typeof window === 'undefined');
export interface IStore {
	user: User | null;
	showSidebar: boolean;
	toggleShowSidebar: () => void;
	hasAdminAccess: boolean;
}

class AppStore {
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
	const _store = store ?? new AppStore();
	_store.hydrate(initialState);
	if (typeof window === 'undefined') return _store;
	if (!store) store = _store;
	return _store;
}
