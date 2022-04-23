import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FormField } from '../../FormField';
import { AuthApi } from 'client/api';
import { setCookie } from 'nookies';
import axios from 'axios';
import * as yup from 'yup';
import { inject } from 'mobx-react';
import { IStore } from 'client/api/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { RegistrationDto } from 'shared/types/auth';

interface LoginForm {
	onClose: () => void;
	store?: IStore;
}

const RegistrationSchema = yup.object().shape({
	email: yup.string().email('email введен не корректно').required('Введите email'),
	password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
	firstName: yup.string().required('Введите своё имя'),
	lastName: yup.string().required('Введите свою фамилию'),
	middleName: yup.string(),
});

export const RegisterForm: React.FC<LoginForm> = inject('store')(({ onClose, store }) => {
	const [responseError, setResponseError] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const form = useForm<RegistrationDto>({ mode: 'onChange', resolver: yupResolver(RegistrationSchema) });

	const onShowPasswordChange = () => setShowPassword(!showPassword);

	const onSubmit = async (data: RegistrationDto) => {
		setResponseError(false);
		try {
			const { user, token } = await AuthApi.registration({
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				middleName: data.middleName,
				lastName: data.lastName,
			});
			setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
			store.user = user;
			onClose();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response);
				setResponseError(error.response.data.message?.join?.(', ') || error.response.data.message);
			}
		}
	};

	const getError = (field) => form.formState.errors[field]?.message;
	const renderLabel = (error, defaultLabel) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);

	return (
		<FormProvider {...form}>
			<FormField name='email' label={renderLabel(getError('email'), 'Почта')} />
			<FormControl fullWidth variant='outlined' size='small'>
				<InputLabel htmlFor='outlined-adornment-password'>
					{renderLabel(getError('password'), 'Пароль')}
				</InputLabel>
				<OutlinedInput
					{...form.register('password')}
					id='outlined-adornment-password'
					type={showPassword ? 'text' : 'password'}
					className='mb-20'
					label={form.formState.errors.password?.message || 'Пароль'}
					fullWidth
					error={!!form.formState.errors.password?.message}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={onShowPasswordChange}
								onMouseDown={onShowPasswordChange}
								edge='end'>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormField name='lastName' label='Фамилия' />
			<FormField name='firstName' label='Имя' />
			<FormField name='middleName' label='Отчество' />
			{responseError && (
				<Alert className='mb-20' severity='error'>
					{responseError}
				</Alert>
			)}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='d-flex align-center justify-center'>
					<Button color='primary' variant='contained' size='large' type='submit' fullWidth>
						Зарегистрироваться
					</Button>
				</div>
			</form>
		</FormProvider>
	);
});
