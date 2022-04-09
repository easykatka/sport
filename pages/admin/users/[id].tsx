import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';
import { UserDto } from 'shared/types/user';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import styles from '../AuthDialog.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormField } from 'client/components/FormField';
import { GridData } from 'client/components/GridData';

interface UserProps {
	user: UserDto;
};

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
