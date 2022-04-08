import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button } from '@mui/material';
import { FormField } from '../../FormField';
import { UserApi } from 'client/api';
import { setCookie } from 'nookies';
import { UserDto } from 'shared/types/user';
import axios from 'axios';
import * as yup from 'yup';

interface LoginForm {
    onClose: () => void;
}

const RegistrationSchema = yup.object().shape({
    email: yup.string().email('email введен не корректно').required('Введите email'),
    password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
    firstName: yup.string().required('Введите своё имя'),
    lastName: yup.string().required('Введите свою фамилию'),
    middleName: yup.string().required('Введите своё отчество'),
});

export const RegisterForm: React.FC<LoginForm> = ({ onClose }) => {
    const [responseError, setResponseError] = React.useState(false);
    const form = useForm<UserDto>({ mode: 'onChange', resolver: yupResolver(RegistrationSchema) });

    const onSubmit = async (data: UserDto) => {
        setResponseError(false);
        try {
            const token = await UserApi.registration({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
            });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseError(error.response.data.message);
            }
        }
    };

    return (
        <FormProvider {...form}>
            <FormField name='email' label='почта' />
            <FormField name='password' label='пароль' />
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
                    <Button color='primary' variant='contained' size='small' type='submit'>
                        Зарегестрироватся
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
