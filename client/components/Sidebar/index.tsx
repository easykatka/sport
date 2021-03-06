import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { TrendingUpOutlined as TrendingIcon, FormatListBulletedOutlined as ListIcon } from '@mui/icons-material';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import LockIcon from '@mui/icons-material/Lock';
import { inject, observer } from 'mobx-react';
import { IStore } from 'client/api/appStore';

interface SidebarProps {
    store?: IStore;
}

export const Sidebar: React.FC<SidebarProps> = inject('store')(
    observer(({ store }) => {
        const router = useRouter();
        const menu = [
            store.hasAdminAccess && { text: 'Администрирование', icon: <LockIcon />, path: '/admin' },
            { text: 'Игры', icon: <SportsSoccerIcon />, path: '/games' },
            { text: 'Правила', icon: <ListIcon />, path: '/rules' },
            { text: 'Рейтинг Игроков', icon: <TrendingIcon />, path: '/rating' },
        ].filter(Boolean);

        return (
            <div className={styles.menu}>
                <ul>
                    {menu.map((obj) => (
                        <li key={obj.path}>
                            <Link href={obj.path}>
                                <a>
                                    <Button variant={obj.path !== '/' && router.asPath.includes(obj.path) ? 'contained' : 'text'}>
                                        {obj.icon}
                                        {obj.text}
                                    </Button>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    })
);
