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
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styled from '@emotion/styled';
import { UserApi } from 'client/api';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface UserProps {
	user: UserDto;
};

const Input = styled('input')({
	display: 'none',
});

const User: FC<UserProps> = ({ user }) => {
	const isNew = !user.id;
	const [responseError, setResponseError] = React.useState(false);

	const UserSchema = yup.object().shape({
		email: yup.string().email('email введен не корректно').required('Введите email'),
		firstName: yup.string().required('Введите своё имя'),
		lastName: yup.string().required('Введите свою фамилию'),
		middleName: yup.string().nullable(true),
		...isNew ? {
			password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
		} : {}
	});

	const form = useForm<UserDto>({
		mode: 'onSubmit',
		defaultValues: user,
		resolver: yupResolver(UserSchema)
	});

	const fields = [
		{ name: 'email', label: 'Email' },
		{ name: 'lastName', label: 'Фамилия' },
		{ name: 'firstName', label: 'Имя' },
		{ name: 'middleName', label: 'Отчество' },
		{ name: 'telegram', label: 'Телеграм' },
		{ name: 'password', label: 'Пароль' },
		{ name: 'avatar', label: 'Фото' }
	]

	const onSubmit = async (data) => {
		Object.keys(data).forEach(key => data[key] === '' && delete data[key])
		console.log("🚀 ~ file: [id].tsx ~ line 43 ~ onSubmit ~ data", data)
		setResponseError(false);
		try {
			isNew ? await UserApi.create(data) : await UserApi.update(data);
			router.push('/admin/user')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.data.message?.join?.(', ') || error.response.data.message);
			}
		}
	};

	const onDelete = async () => {
		setResponseError(false);
		try {
			await UserApi.delete(user.id)
			router.push('/admin/user')
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
						<label htmlFor="icon-button-file">
							<Input accept="image/*" id="icon-button-file" type="file" />
							<IconButton color="primary" aria-label="upload picture" component="span">
								<AddAPhotoIcon />
							</IconButton>
						</label>
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
		const user = await fetch(`/api/user/getById/${id}`);
		return { user };
	} catch (e) {
		console.log(e);
	}
});

export default User;
