import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';

import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, IconButton } from '@mui/material';
import { GridData } from 'client/components/GridData';
import DeleteIcon from '@mui/icons-material/Delete';
import { SourceApi } from 'client/api';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Source as SourceEntity } from 'server/modules/source/source.entity';

interface UserSourceProps {
	usersource: SourceEntity;
};


const UserSource: FC<UserSourceProps> = ({ usersource }) => {
	const isNew = !usersource.id;
	const [responseError, setResponseError] = React.useState<string | null>(null);

	const Schema = yup.object().shape({
		name: yup.string().required('Введите название'),
	});

	const form = useForm<SourceEntity>({
		mode: 'onSubmit',
		defaultValues: usersource,
		resolver: yupResolver(Schema)
	});

	const fields = [
		{ name: 'name', label: 'Описание' },
	]

	const onSubmit = async (data) => {
		Object.keys(data).forEach(key => data[key] === '' && delete data[key])
		setResponseError(null);
		try {
			isNew ? await SourceApi.create(data) : await SourceApi.update(data);
			router.push('/admin/usersource')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	};

	const onDelete = async () => {
		setResponseError(null);
		try {
			await SourceApi.delete(usersource.id)
			router.push('/admin/usersource')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	}


	return (
		<>
			<Head>
				<title>Администрирование СОЮЗ | Источник пользователя</title>
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
								{isNew ? 'Создать' : 'Сохранить'}
							</Button>
							{!isNew && <IconButton color="secondary" size="large" onClick={onDelete}>
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
		const usersource = await fetch(`/api/usersource/getById/${id}`);
		return { usersource };
	} catch (e) {
		console.log(e);
	}
});

export default UserSource;
