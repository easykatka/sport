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

const Rules: FC = ({ roles }: any) => {
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
								<TableCell>Название роли</TableCell>
								<TableCell>Описание роли</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{roles.map((role) => (
								<TableRow key={role.id} onClick={() => router.push(`${router.asPath}/${role.id}`)}>
									<TableCell>{role.id}</TableCell>
									<TableCell>{role.name}</TableCell>
									<TableCell>{role.description}</TableCell>
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
		const roles = await fetch('/api/role/getRoles');
		return { roles };
	} catch (e) {
		console.log(e);
	}
});

export default Rules;
