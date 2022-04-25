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
import { Role } from 'server/modules/role/role.entity';

interface RoleMappingsProps {
	rolemapping: RoleMapping
}

const RoleMappings: FC<RoleMappingsProps> = ({ rolemapping }) => {
	rolemapping.roleId = 12
	const onAddClick = () => router.push('/admin/rolemapping/add')
	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Назначение ролей</title>
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
		const users = await fetch('/api/user/getAll');
		const roles = await fetch('/api/role/getAll');
		return { rolemapping, users, roles };
	} catch (e) {
		console.log(e);
	}
});

export default RoleMappings;
