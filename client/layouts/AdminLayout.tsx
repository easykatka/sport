import React from 'react';
import { AdminSidebar } from 'client/components/sidebars';
import { inject, observer } from 'mobx-react';
import { IStore } from 'client/api/appStore';

interface AdminLayoutProps {
    hideMenu?: boolean;
    store?: IStore;
    children: any;
}

export const AdminLayout: React.FC<AdminLayoutProps> = inject('store')(
    observer(({ children, store }) => {
        const { showSidebar } = store;
        return (
            <div className={'wrapper'}>
                {showSidebar && (
                    <div className='leftSide'>
                        <AdminSidebar />
                    </div>
                )}
                <div className={'content-admin'}>{children}</div>
            </div>
        );
    })
);
