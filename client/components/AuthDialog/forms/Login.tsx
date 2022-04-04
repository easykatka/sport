import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button } from '@mui/material';
import { LoginSchema } from '../../../utils/yupSchemaValidation';
import { FormField } from '../../FormField';
import { UserApi } from 'client/api';
import { setCookie } from 'nookies';
import { LoginDto } from 'client/api/types';
import axios from 'axios';

interface LoginForm {
    onOpenRegister: () => void;
    onClose: () => void;
}

export const LoginForm: React.FC<LoginForm> = ({ onOpenRegister, onClose }) => {
    const [responseError, setResponseError] = React.useState(false);
    const form = useForm<LoginDto>({ mode: 'onChange', resolver: yupResolver(LoginSchema) });

    const onSubmit = async (data: LoginDto) => {
        setResponseError(false);
        try {
            const { token } = await UserApi.login({ email: data.email, password: String(data.password) });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseError(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='email' label='почта' />
                    <FormField name='password' label='пароль' />
                    {responseError && (
                        <Alert className='mb-20' severity='error'>
                            {responseError}
                        </Alert>
                    )}
                    <div className='d-flex align-center justify-between flex-column fullWidth'>
                        <div>
                            <Button
                                color='primary'
                                variant='contained'
                                type='submit'
                                size='small'
                                disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                Войти
                            </Button>
                            <Button
                                color='primary'
                                variant='contained'
                                className='ml-10'
                                size='small'
                                onClick={onOpenRegister}>
                                Регистрация
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
