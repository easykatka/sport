import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import { AuthDialog } from '../auth';
import { Paper, IconButton, Avatar } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { IStore } from 'client/api/store';
import { setCookie } from 'nookies';
import {
	AccountCircleOutlined as UserIcon,
	Menu as MenuIcon,
	ExpandMoreOutlined as ArrowBottom,
	NotificationsNoneOutlined as NotificationIcon,
	SmsOutlined as MessageIcon,
} from '@mui/icons-material';

interface IHeader {
	store?: IStore;
}

export const Header: React.FC<IHeader> = inject('store')(observer(({ store }) => {
	const [authVisible, setAuthVisible] = React.useState(false);

	const openAuthDialog = () => {
		setAuthVisible(true);
	};

	const closeAuthDialog = () => {
		setAuthVisible(false);
	};

	useEffect(() => {
		if (authVisible && store.user) {
			setAuthVisible(false);
		}
	}, [authVisible, store.user]);

	const logout = () => {
		setCookie(null, 'token', null, { maxAge: 30 * 24 * 60 * 60, path: '/' });
		store.user = null;
	};

	return <Paper classes={{ root: styles.root }} elevation={0}>
		<div className='d-flex align-center'>
			<IconButton onClick={() => store.toggleShowSidebar()}>
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
			{store.user ? (
				<>
					<Avatar
						className={styles.avatar}
						alt='Remy Sharp'
						src='https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/'
					/>
					<ArrowBottom onClick={logout} style={{ cursor: 'pointer' }} />
				</>
			) : (
				<IconButton onClick={openAuthDialog} className={styles.loginButton}>
					<UserIcon />
					Войти
				</IconButton>
			)}
		</div>
		{authVisible && <AuthDialog onClose={closeAuthDialog} visible={authVisible} />}
	</Paper>;
}));