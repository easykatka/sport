import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rolemapping as Rolemapping_Entity } from 'server/modules/rolemapping/rolemapping.entity';
import { RecordSelect } from 'client/components/inputs/RecordSelect';
import { fioShort } from 'client/helpers/fio';
import { RolemappingDto } from 'shared/dto/rolemapping.dto';
import { RoleMappingService, RoleService, UserService } from 'client/api';
interface RoleMapping {
	rolemapping: Rolemapping_Entity;
}

const RoleMapping: FC<RoleMapping> = ({ rolemapping }) => {
	const isNew = !rolemapping?.id;
	const [responseError, setResponseError] = React.useState<string | null>(null);

	const Schema = yup.object().shape({
		roleId: yup.string().required('Выберите роль'),
		userId: yup.string().required('Выберите пользователя'),
	});

	const form = useForm<RolemappingDto>({
		mode: 'onChange',
		defaultValues: rolemapping,
		resolver: yupResolver(Schema),
	});

	const onSubmit = async (data: RolemappingDto) => {
		Object.keys(data).forEach((key) => data[key] === '' && delete data[key]);
		setResponseError(null);
		try {
			isNew ? await RoleMappingService.create(data) : await RoleMappingService.update({
				userId: data.userId,
				roleId: data.roleId,
				id: data.id
			});
			router.push('/admin/rolemapping');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	};

	const onDelete = async () => {
		setResponseError(null);
		try {
			await RoleMappingService.delete(rolemapping.id);
			router.push('/admin/rolemapping');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	};

	const renderUser = (record) => fioShort(record);

	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Назначение ролей</title>
			</Head>
			<AdminLayout>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<RecordSelect name="roleId" service={RoleService} property="name" label="Роль" />
						<RecordSelect name="userId" service={UserService} label="Пользователь" computed={renderUser} />

						<div className='mt-20'>
							<Button color='primary' variant='contained' size='large' type='submit'>
								{isNew ? 'Создать' : 'Сохранить'}
							</Button>
							{!isNew && (
								<IconButton color='secondary' size='large' onClick={onDelete}>
									<DeleteIcon />
								</IconButton>
							)}
						</div>
						{responseError && (
							<Alert className='mt-20' severity='error'>
								{responseError}
							</Alert>
						)}
					</form>
				</FormProvider>
			</AdminLayout>
		</>
	);
};

export const getServerSideProps = buildServerSideProps(async (ctx) => {
	try {
		const { id } = ctx.query;
		const rolemapping = Number.isInteger(+id) ? await fetch(`/api/rolemapping/getById/${id}`) : null;
		return { rolemapping };
	} catch (e) {
		console.log(e);
	}
});

export default RoleMapping;
