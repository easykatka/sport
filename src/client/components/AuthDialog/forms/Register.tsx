import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { LoginSchema } from 'src/client/utils/yupSchemaValidation';
import { FormField } from '../../FormField';
import { UserApi } from 'src/client/api';
import { setCookie } from 'nookies';

interface LoginForm {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
}

export const RegisterForm: React.FC<LoginForm> = ({ onOpenRegister, onOpenLogin }) => {
    const form = useForm({ mode: 'onChange', resolver: yupResolver(LoginSchema) });

    const onSubmit = async (data) => {
        try {
            const { token } = await UserApi.registration({
                login: data.email,
                password: String(data.paswword),
            });
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
        } catch (e) {
            console.log(e, 'error');
        }
    };

    return (
        <FormProvider {...form}>
            <FormField name='email' label='почта' />
            <FormField name='password' label='пароль' />
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
