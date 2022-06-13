import React from 'react';
import clsx from 'clsx';
import { Sidebar } from '../components/sidebar';
import { SideComments } from '../components/side-comments';
import { inject, observer } from 'mobx-react';
import { IStore } from 'client/api/store';

interface MainLayoutProps {
	hideComments?: boolean;
	hideMenu?: boolean;
	contentFullWidth?: boolean;
	className?: string;
	store?: IStore;
	children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = inject('store')(
	observer(({ children, contentFullWidth, hideComments, store, className }) => {
		const { showSidebar } = store;

		return (
			<div className={clsx('wrapper', className)} >
				{showSidebar && (
					<div className='leftSide'>
						<Sidebar />
					</div>
				)
				}
				<div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
				{!hideComments && (
					<div className='rightSide'>
						<SideComments />
					</div>
				)}
			</div >
		);
	})
);
