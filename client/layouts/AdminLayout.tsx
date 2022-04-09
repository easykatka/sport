import React from 'react';
import clsx from 'clsx';
import { AdminSidebar } from 'client/components/AdminSidebar';
import { inject, observer } from 'mobx-react';
import { IStore } from 'client/api/store';

interface MainLayoutProps {
	hideComments?: boolean;
	hideMenu?: boolean;
	contentFullWidth?: boolean;
	className?: string;
	store?: IStore;
}

export const AdminLayout: React.FC<MainLayoutProps> = inject('store')(
	observer(({ children, contentFullWidth, hideComments, store, className }) => {
		const { showSidebar } = store;
		return (
			<div className={clsx('wrapper', className)}>
				{showSidebar && (
					<div className='leftSide'>
						<AdminSidebar />
					</div>
				)}
				<div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
			</div>
		);
	})
);
