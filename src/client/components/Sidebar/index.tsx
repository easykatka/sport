import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import {
    WhatshotOutlined as FireIcon,
    SmsOutlined as MessageIcon,
    TrendingUpOutlined as TrendingIcon,
    FormatListBulletedOutlined as ListIcon,
} from '@mui/icons-material';

import styles from './SideBar.module.scss';
import { useRouter } from 'next/router';

const menu = [
    { text: 'Игры', icon: <FireIcon />, path: '/' },
    { text: 'Правила', icon: <ListIcon />, path: '/rules' },
    { text: 'Рейтинг Игроков', icon: <TrendingIcon />, path: '/rating' },
];

export const SideBar: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.menu}>
            <ul>
                {menu.map((obj) => (
                    <li key={obj.path}>
                        <Link href={obj.path}>
                            <a>
                                <Button variant={router.asPath === obj.path ? 'contained' : 'text'}>
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
};
