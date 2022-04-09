import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import styles from './AdminSidebar.module.scss';
import { useRouter } from 'next/router';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const path = '/admin'
const menu = [
	{ text: 'Пользователи', icon: <PersonIcon />, path: `${path}/users` },
	{ text: 'Роли', icon: <GroupIcon />, path: `${path}/roles` },
	{ text: 'Назначение ролей', icon: <AdminPanelSettingsIcon />, path: `${path}/rolemappings` },
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
