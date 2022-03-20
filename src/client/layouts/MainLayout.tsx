import React from 'react';
import clsx from 'clsx';
import { SideBar } from '../components/Sidebar';

interface MainLayoutProps {
    hideComments?: boolean;
    hideMenu?: boolean;
    contentFullWidth?: boolean;
    className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    contentFullWidth,

    hideMenu,
    className,
}) => {
    return (
        <div className={clsx('wrapper', className)}>
            {!hideMenu && (
                <div className='sidebar'>
                    <SideBar />
                </div>
            )}
            <div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
        </div>
    );
};
