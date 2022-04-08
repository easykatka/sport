import React from 'react';
import Link from 'next/link';
import { Paper } from '@mui/material';
import { AccountCircleOutlined as UserIcon } from '@mui/icons-material';
import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import Image from 'next/image';
import { inject } from 'mobx-react';
import { StoreType } from '../../api/store';

interface HeaderProps {
    store: StoreType;
}

export const Header: React.FC<HeaderProps> = inject('store')(({ store }) => {
    const [authVisible, setAuthVisible] = React.useState(false);
    const openAuthDialog = () => setAuthVisible(true);
    const closeAuthDialog = () => setAuthVisible(false);
    return (
        <Paper classes={{ root: styles.root }}>
            <div className={styles.wrapper}>
                <Link href='/'>
                    <a>
                        <Image src='/static/img/logo.png' width='130' height='110' />
                    </a>
                </Link>
                {}
                {store.user ? (
                    <div className={styles.loginButton} onClick={openAuthDialog}>
                        <UserIcon />
                        {store.user.firstName}
                    </div>
                ) : (
                    <div className={styles.loginButton} onClick={openAuthDialog}>
                        <UserIcon />
                        Войти
                    </div>
                )}
            </div>
            {authVisible && <AuthDialog onClose={closeAuthDialog} visible={authVisible} />}
        </Paper>
    );
});
