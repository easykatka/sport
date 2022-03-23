import React from 'react';
import clsx from 'clsx';
import { SideBar } from '../components/Sidebar';
import { Header } from '../components/Header';

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
        <>
            <Header />
            <div className='wrapper'>
                {!hideMenu && (
                    <div className='sidebar'>
                        <SideBar />
                    </div>
                )}
                <div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
            </div>
        </>
    );
};
