import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button } from '@mui/material';
import { RegistrationSchema } from 'src/client/utils/yupSchemaValidation';
import { FormField } from '../../FormField';
import { UserApi } from 'src/client/api';
import { setCookie } from 'nookies';
import { RegistrationDto } from 'src/client/api/types';
import axios from 'axios';

interface LoginForm {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
}

export const RegisterForm: React.FC<LoginForm> = ({ onOpenRegister }) => {
    const [responseError, setResponseError] = React.useState(false);
    const form = useForm<RegistrationDto>({ mode: 'onChange', resolver: yupResolver(RegistrationSchema) });

    const onSubmit = async (data: RegistrationDto) => {
        setResponseError(false);
        try {
            const { token } = await UserApi.registration({
                email: data.email,
                password: String(data.password),
                firstName: String(data.firstName),
                middleName: String(data.middleName),
                lastName: String(data.lastName),
            });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
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
                    <Button
                        color='primary'
                        variant='contained'
                        size='small'
                        type='submit'
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                        onClick={onOpenRegister}>
                        Зарегестрироватся
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
