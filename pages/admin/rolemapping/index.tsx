import { FC } from 'react';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { Rolemapping as RoleUserEntity } from 'server/modules/rolemapping/rolemapping.entity';
import { ModelList } from 'client/components/model-list';

interface RoleMapping {
	rolemapping: RoleUserEntity[];
}

const RoleMappings: FC<RoleMapping> = ({ rolemapping }) => {
	const columns = [
		{ label: 'id', field: 'id' },
		{ label: 'Пользователь', relation: 'user', field: 'email' },
		{ label: 'Роль', relation: 'role', field: 'name' },
	];
	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Назначение ролей</title>
			</Head>
			<AdminLayout>
				<ModelList records={rolemapping} columns={columns} />
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

export default RoleMappings;
