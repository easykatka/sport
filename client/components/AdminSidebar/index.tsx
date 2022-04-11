import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import styles from './AdminSidebar.module.scss';
import { useRouter } from 'next/router';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';

const path = '/admin'
const menu = [
	{ text: 'Основное меню', icon: <HomeIcon />, path: '/' },
	{ text: 'Пользователи', icon: <PersonIcon />, path: `${path}/user` },
	{ text: 'Роли', icon: <EngineeringIcon />, path: `${path}/role` },
	{ text: 'Назначение ролей', icon: <AdminPanelSettingsIcon />, path: `${path}/rolemapping` },
];

export const AdminSidebar: React.FC = () => {
	const router = useRouter();
	return (
		<div className={styles.menu}>
			<ul>
				{menu.map((obj) => (
					<li key={obj.path}>
						<Link href={obj.path}>
							<a>
								<Button variant={obj.path !== '/' && (router.asPath + '/').includes(obj.path + '/') ? 'contained' : 'text'}>
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
