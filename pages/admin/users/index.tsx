import { FC } from 'react';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import router from 'next/router';

const Rules: FC = ({ users }: any) => {
	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Пользователи</title>
			</Head>
			<AdminLayout>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>id</TableCell>
								<TableCell>Фамилия</TableCell>
								<TableCell>Имя</TableCell>
								<TableCell>Отчество</TableCell>
								<TableCell>Почта</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id} onClick={() => router.push(`${router.asPath}/${user.id}`)}>
									<TableCell>{user.id}</TableCell>
									<TableCell component='th' scope='row'>{user.lastName}</TableCell>
									<TableCell>{user.firstName}</TableCell>
									<TableCell>{user.middleName}</TableCell>
									<TableCell>{user.email}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</AdminLayout>
		</>
	);
};

export const getServerSideProps = buildServerSideProps(async () => {
	try {
		const users = await fetch('/api/user/getUsers');
		return { users };
	} catch (e) {
		console.log(e);
	}
});

export default Rules;
