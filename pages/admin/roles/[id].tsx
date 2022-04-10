import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';
import { UserDto } from 'shared/types/UserDto';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, IconButton } from '@mui/material';
import { GridData } from 'client/components/GridData';
import DeleteIcon from '@mui/icons-material/Delete';
import { RoleApi, UserApi } from 'client/api';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoleDto } from 'shared/types/RoleDto';
interface RoleProps {
	role: RoleDto;
};


const Role: FC<RoleProps> = ({ role }) => {
	const isNew = !!role.id;
	const [responseError, setResponseError] = React.useState(false);

	const RoleShema = yup.object().shape({
		name: yup.string().required('Введите название'),
	});

	const form = useForm<UserDto>({
		mode: 'onSubmit',
		defaultValues: role,
		resolver: yupResolver(RoleShema)
	});

	const fields = [
		{ name: 'name', label: 'name' },
		{ name: 'description', label: 'Описание' },
	]

	const onSubmit = async (data) => {
		setResponseError(false);
		try {
			isNew ? await RoleApi.create(data) : await RoleApi.update(data);
			router.push('/admin/roles')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.data.message?.join?.(', ') || error.response.data.message);
			}
		}
	};

	const onDelete = async () => {
		setResponseError(false);
		try {
			await RoleApi.delete(role.id)
			router.push('/admin/roles')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.data.message?.join?.(', ') || error.response.data.message);
			}
		}
	}


	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Пользователь</title>
			</Head>
			<AdminLayout>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<GridData fields={fields} />
						<div className="mt-20">
							<Button
								color='primary'
								variant='contained'
								size='large'
								type='submit'>
								{isNew ? 'Сохранить' : 'Создать'}
							</Button>
							{isNew && <IconButton color="secondary" size="large" onClick={onDelete}>
								<DeleteIcon />
							</IconButton>
							}
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
		const role = await fetch(`/api/role/getById/${id}`);
		return { role };
	} catch (e) {
		console.log(e);
	}
});

export default Role;
