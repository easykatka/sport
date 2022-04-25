import { FC } from 'react';
import { MainLayout } from '../client/layouts/MainLayout';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { User } from 'server/modules/user/user.entity';

interface RatingProps {
	users: User[]
}

const Rating: FC<RatingProps> = ({ users = [] }) => {
	return (
		<>
			<Head>
				<title>Рейтинг игроков | СОЮЗ</title>
			</Head>
			<MainLayout>
				{users.map((player) => (
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



export default Rating;
