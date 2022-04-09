import { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';

const Games: FC = () => {
	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Пользователи</title>
			</Head>
			<AdminLayout>
				Пользователь 10
			</AdminLayout>
		</>
	);
};

export default Games;
