import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';
import { UserDto } from 'shared/types/user';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, IconButton } from '@mui/material';
import { GridData } from 'client/components/GridData';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styled from '@emotion/styled';

interface UserProps {
	user: UserDto;
};

const Input = styled('input')({
	display: 'none',
});

const User: FC<UserProps> = ({ user }) => {
	const [responseError, setResponseError] = React.useState(false);
	const form = useForm<UserDto>({ mode: 'onChange', defaultValues: user });

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
		setResponseError(false);
		try {
			alert('123')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response.data.message);
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
						<label htmlFor="icon-button-file">
							<Input accept="image/*" id="icon-button-file" type="file" />
							<IconButton color="primary" aria-label="upload picture" component="span">
								<AddAPhotoIcon />
							</IconButton>
						</label>
						<div className="controls">
							<Button
								color='primary'
								variant='contained'
								size='large'
								type='submit'>
								{user.id ? 'Сохранить' : 'Создать'}
							</Button>
							{user.id && <IconButton color="secondary" size="large">
								<DeleteIcon />
							</IconButton>
							}
						</div>



						{responseError && (
							<Alert className='mb-20' severity='error'>
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
