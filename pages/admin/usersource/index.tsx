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
import { UserSourceDto } from 'shared/types/UserSourceDto';

interface UserSourceProps {
	usersources: UserSourceDto[]
}

const UserSource: FC<UserSourceProps> = ({ usersources }) => {
	const onAddClick = () => router.push('/admin/usersources/add')
	return (
		<>
			<Head>
				<title>Источники пользователя СОЮЗ | Пользователи</title>
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
								<TableCell>Название источнка</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{usersources.map((source) => (
								<TableRow hover key={source.id} onClick={() => router.push(`${router.asPath}/${source.id}`)}>
									<TableCell>{source.id}</TableCell>
									<TableCell>{source.name}</TableCell>
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
		const usersources = await fetch('/api/usersource/getAll');
        console.log("🚀 ~ file: index.tsx ~ line 61 ~ getServerSideProps ~ usersources", usersources)
		return { usersources };
	} catch (e) {
		console.log(e);
	}
});

export default UserSource;
