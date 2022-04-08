import React, { useEffect } from 'react';
import Link from 'next/link';
import {
    AccountCircleOutlined as UserIcon,
    Menu as MenuIcon,
    ExpandMoreOutlined as ArrowBottom,
    NotificationsNoneOutlined as NotificationIcon,
    SearchOutlined as SearchIcon,
    SmsOutlined as MessageIcon,
} from '@mui/icons-material';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';

import { Paper, Button, IconButton, Avatar, ListItem, List } from '@mui/material';
import { inject } from 'mobx-react';
import { IStore } from 'client/api/store';

interface IHeader {
    store?: IStore;
}

export const Header: React.FC<IHeader> = inject('store')(({ store }) => {
    const { user, toggleShowSidebar } = store;
    const [authVisible, setAuthVisible] = React.useState(false);

    const openAuthDialog = () => {
        setAuthVisible(true);
    };

    const closeAuthDialog = () => {
        setAuthVisible(false);
    };

    useEffect(() => {
        if (authVisible && user) {
            setAuthVisible(false);
        }
    }, [authVisible, user]);

    return (
        <Paper classes={{ root: styles.root }} elevation={0}>
            <div className='d-flex align-center'>
                <IconButton onClick={() => toggleShowSidebar()}>
                    <MenuIcon />
                </IconButton>
                <Link href='/'>
                    <a>
                        <img height={35} className='mr-20' src='/static/img/logo.png' alt='Logo' />
                    </a>
                </Link>
            </div>
            <div className='d-flex align-center'>
                <IconButton>
                    <MessageIcon />
                </IconButton>
                <IconButton>
                    <NotificationIcon />
                </IconButton>
                {user ? (
                    <>
                        <Avatar
                            className={styles.avatar}
                            alt='Remy Sharp'
                            src='https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/'
                        />
                        <ArrowBottom />
                    </>
                ) : (
                    <div className={styles.loginButton} onClick={openAuthDialog}>
                        <UserIcon />
                        Войти
                    </div>
                )}
            </div>
            <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
        </Paper>
    );
});
