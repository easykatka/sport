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
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User as UserEntity } from 'server/modules/user/user.entity';
import { UserService } from 'client/api';
interface UserProps {
	user: UserEntity;
}

const User: FC<UserProps> = ({ user }) => {
	const isNew = !user?.id;
	const [responseError, setResponseError] = React.useState<string | null>(null);

	const UserSchema = yup.object().shape({
		email: yup.string().email('email введен не корректно').required('Введите email'),
		firstname: yup.string().required('Введите своё имя'),
		lastname: yup.string().required('Введите свою фамилию'),
		middlename: yup.string().nullable(true),
		...(isNew
			? {
				password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
			}
			: {}),
	});

	const form = useForm<UserEntity>({
		mode: 'onSubmit',
		defaultValues: user,
		resolver: yupResolver(UserSchema),
	});

	const fields = [
		{ name: 'email', label: 'Email' },
		{ name: 'lastname', label: 'Фамилия' },
		{ name: 'firstname', label: 'Имя' },
		{ name: 'middlename', label: 'Отчество' },
		{ name: 'telegram', label: 'Телеграм' },
		{ name: 'password', label: 'Пароль' },
		{ name: 'avatar', label: 'Фото' },
	];

	const onSubmit = async (data) => {
		Object.keys(data).forEach((key) => {
			if (data[key] === '' || typeof data[key] === 'object')
				delete data[key]
		});
		setResponseError(null);
		try {
			isNew ? await UserService.create(data) : await UserService.update(data);
			router.push('/admin/user');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.statusText);
			}
		}
	};

	const onDelete = async () => {
		setResponseError(null);
		try {
			await UserService.delete(user.id);
			router.push('/admin/user');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error);
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
						<GridData fields={fields} />
						<label htmlFor='icon-button-file'>
							{/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
							<IconButton color='primary' aria-label='upload picture' component='span'>
								<AddAPhotoIcon />
							</IconButton>
						</label>
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
		const user = Number.isInteger(+id) ? await fetch(`/api/user/getById/${id}`) : null;
		return { user };
	} catch (e) {
		console.log(e);
	}
});

export default User;
