import { FC } from 'react';
import { MainLayout } from '../client/layouts/MainLayout';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { UserDto } from 'shared/types/UserDto';


const Rating: FC = ({ players }) => {
	return (
		<>
			<Head>
				<title>Рейтинг игроков | СОЮЗ</title>
			</Head>
			<MainLayout>
				{players.map((player) => (
					<div>
						<div>{player.id}</div>
						<div>{player.email}</div>
						<div>{player.firstName}</div>
					</div>
				))}
			</MainLayout>
		</>
	);
};

export const getServerSideProps = buildServerSideProps(async () => {
	try {
		const players = await fetch('/api/user/getAll');
		return { players };
	} catch (e) {
		console.log(e);
	}
});

export default Rating;
