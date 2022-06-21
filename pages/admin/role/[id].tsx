import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Role as RoleEntity } from 'server/modules/role/role.entity';
import { ColorPicker } from 'client/components/inputs/ColorPicker';
import { FormField } from 'client/components/inputs/FormField';
import { RoleService } from 'client/api';

interface RoleProps {
	role: RoleEntity;
}

const Role: FC<RoleProps> = ({ role }) => {
	const isNew = !role?.id;
	const [responseError, setResponseError] = React.useState<string | null>(null);

	const Schema = yup.object().shape({
		name: yup.string().required('Введите название'),
		description: yup.string().required('Введите описание'),
	});

	const form = useForm<RoleEntity>({
		mode: 'onSubmit',
		defaultValues: role,
		resolver: yupResolver(Schema),
	});

	const fields = [
		{ name: 'name', label: 'Название' },
		{ name: 'description', label: 'Описание' },
	];

	const onSubmit = async (data) => {
		Object.keys(data).forEach((key) => data[key] === '' && delete data[key]);
		setResponseError(null);
		try {
			isNew ? await RoleService.create(data) : await RoleService.update(data);
			router.push('/admin/role');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	};

	const onDelete = async () => {
		setResponseError(null);
		try {
			await RoleService.delete(role.id);
			router.push('/admin/role');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	};

	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Пользователь</title>
			</Head>
			<AdminLayout>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							{fields.map(({ name, label }, index) => <Grid key={index} item xs={12} md={6} xl={4}>
								<FormField name={name} label={label} />
							</Grid>)}
							<Grid item xs={12} md={6} xl={4}><ColorPicker name='color' label='Цвет' /></Grid>
						</Grid>
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
		const role = Number.isInteger(+id) ? await fetch(`/api/role/getById/${id}`) : null;
		return { role };
	} catch (e) {
		console.log(e);
	}
});

export default Role;
