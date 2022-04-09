import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { TrendingUpOutlined as TrendingIcon, FormatListBulletedOutlined as ListIcon } from '@mui/icons-material';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';

const menu = [
    { text: 'Игры', icon: <SportsSoccerIcon />, path: '/' },
    { text: 'Правила', icon: <ListIcon />, path: '/rules' },
    { text: 'Рейтинг Игроков', icon: <TrendingIcon />, path: '/rating' },
];

export const Sidebar: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.menu}>
            <ul>
                {menu.map((obj) => (
                    <li key={obj.path}>
                        <Link href={obj.path}>
                            <a>
								<Button variant={router.asPath.includes(obj.path) ? 'contained' : 'text'}>
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
