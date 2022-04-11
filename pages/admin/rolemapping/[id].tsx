import { FC } from 'react';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';

const Rules: FC = ({ users }: any) => {
	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Назначение ролей</title>
			</Head>
			<AdminLayout>
				Назначение ролей 12
			</AdminLayout>
		</>
	);
};

export const getServerSideProps = buildServerSideProps(async () => {
	try {
		const players = await fetch('/api/user/getAllUsers');
		return { players };
	} catch (e) {
		console.log(e);
	}
});

export default Rules;
