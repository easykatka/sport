import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { LoginSchema } from '../../../utils/yupSchemaValidation';
import { FormField } from '../../FormField';
import Image from 'next/image';
import { UserApi } from 'src/client/api';
import { setCookie } from 'nookies';

interface LoginForm {
    onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginForm> = ({ onOpenRegister }) => {
    const form = useForm({ mode: 'onChange', resolver: yupResolver(LoginSchema) });
    const onSubmit = async (data) => {
        try {
            const { token } = await UserApi.login({
                login: data.email,
                password: String(data.paswword),
            });
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
        } catch (e) {
            // form.setError('serverError', e.response.data.message);
            // console.log(e.response.data, '>>>>>>>>>');
        }
    };

    console.log(form.formState.errors);
    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='email' label='почта' />
                    <FormField name='password' label='пароль' />
                    <div className='d-flex align-center justify-between flex-column fullWidth'>
                        {/* <div>
                            <Button className='mb-15' variant='contained' fullWidth>
                                <Image src='/static/img/vk.svg' width='24' height='24' /> ВКонтакте
                            </Button>
                            <Button className='mb-15' variant='contained' fullWidth>
                                <Image src='/static/img/google.svg' width='24' height='24' /> Google
                            </Button>
                        </div> */}
                        <div>
                            <Button
                                color='primary'
                                variant='contained'
                                type='submit'
                                size='small'
                                disabled={!form.formState.isValid}>
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
