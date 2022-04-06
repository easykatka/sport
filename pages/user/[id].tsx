import { FC } from 'react';
import { MainLayout } from 'client/layouts/MainLayout';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';



const User: FC = ({ user }: any) => {
	return (
		<>
			<Head>
				<title>Рейтинг игроков | СОЮЗ</title>
			</Head>
			<MainLayout>
				{user.email}
			</MainLayout>
		</>
	);
};

export const getServerSideProps = buildServerSideProps(async (req:any) => {
	try {
		console.log(req,'rrrrrr') 
		const user = await fetch('/api/user/getUserByEmail', req.email);
		return { user };
	} catch (e) {
		console.log(e);
	}
});

export default User;
