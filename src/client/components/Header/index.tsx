import React from 'react';
import Link from 'next/link';
import { Paper, IconButton } from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';

export const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = React.useState(false);

  const openAuthDialog = () => setAuthVisible(true);
  const closeAuthDialog = () => setAuthVisible(false);

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo" />
          </a>
        </Link>



      </div>
      <div className="d-flex align-center">
        <div className={styles.loginButton} onClick={openAuthDialog}>
          <UserIcon />
          Войти
        </div>
      </div>
      <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};
