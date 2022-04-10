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
import { Button } from '@mui/material';

const Rules: FC = ({ rolemapping }: any) => {
	console.log("🚀 ~ file: index.tsx ~ line 17 ~ roles", rolemapping)
	const onAddClick = () => router.push('/admin/rolemappings/add')
	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Пользователи</title>
			</Head>
			<AdminLayout>
				<Button
					className='mb-20'
					color='primary'
					variant='contained'
					onClick={onAddClick}
					size='large'>Добавить</Button>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>id</TableCell>
								<TableCell>Пользователь</TableCell>
								<TableCell>Роль</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rolemapping.map((role) => (
								<TableRow hover key={role.id} onClick={() => router.push(`${router.asPath}/${role.id}`)}>
									<TableCell>{role.id}</TableCell>
									<TableCell>{role.roleName}</TableCell>
									<TableCell>{role.userName}</TableCell>
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
		const rolemapping = await fetch('/api/rolemapping/getAll');
		return { rolemapping };
	} catch (e) {
		console.log(e);
	}
});

export default Rules;
