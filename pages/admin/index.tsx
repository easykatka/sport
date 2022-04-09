import { FC } from 'react';
import { AdminLayout } from 'client/layouts/AdminLayout';
import Head from 'next/head';

const Games: FC = () => {
	return (
		<>
			<Head>
				<title>Администрирование | СОЮЗ</title>
			</Head>
			<AdminLayout>
				<div>Администрирование | СОЮЗ</div>
			</AdminLayout>
		</>
	);
};

export default Games;
