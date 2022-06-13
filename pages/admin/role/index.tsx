import { FC } from 'react';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { ModelList } from 'client/components/model-list';
import { Role as RoleEntity } from 'server/modules/role/role.entity';

interface Roles {
	roles: RoleEntity[];
}

const Roles: FC<Roles> = ({ roles }) => {
	const columns = [
		{ label: 'id', field: 'id' },
		{ label: 'Название', field: 'email' },
		{ label: 'Описание', field: 'description' },
		{ label: 'Цвет', field: 'color' },
	];

	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Роли</title>
			</Head>
			<AdminLayout>
				<ModelList records={roles} columns={columns} />
			</AdminLayout>
		</>
	);
};

export const getServerSideProps = buildServerSideProps(async () => {
	try {
		const roles = await fetch('/api/role/getAll');
		return { roles };
	} catch (e) {
		console.log(e);
	}
});

export default Roles;
