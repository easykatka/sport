import React from 'react';
import Link from 'next/link';
import { Paper } from '@mui/material';
import { AccountCircleOutlined as UserIcon } from '@mui/icons-material';
import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import Image from 'next/image';

export const Header: React.FC = () => {
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

                <div className={styles.loginButton} onClick={openAuthDialog}>
                    <UserIcon />
                    Войти
                </div>
            </div>
            {authVisible && <AuthDialog onClose={closeAuthDialog} visible={authVisible} />}
        </Paper>
    );
};
