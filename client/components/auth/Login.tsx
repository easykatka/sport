import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button } from '@mui/material';
import { FormField } from '../inputs/FormField';
import { setCookie } from 'nookies';
import axios from 'axios';
import { inject, Observer, useLocalObservable } from 'mobx-react';
import { IStore } from 'client/api/appStore';
import styles from './auth.module.scss';
import { LoginDto } from 'shared/dto/login.dto';
import { AuthService } from 'client/api';
import { PasswordInput } from '../inputs/PasswordInput';

interface LoginForm {
    onOpenRegister: () => void;
    onClose: () => void;
    store?: IStore;
}

export const LoginForm: React.FC<LoginForm> = inject('store')(({ onOpenRegister, onClose, store }) => {
    const state = useLocalObservable(() => ({
        responseError: false,
        showPassword: false,
    }));
    const form = useForm<LoginDto>({ mode: 'onChange' });

    const onSubmit = async (data: LoginDto) => {
        state.responseError = false;
        try {
            const { token, user } = await AuthService.login({ email: data.email, password: String(data.password) });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            store.user = user;
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message } = error.response.data as any;
                state.responseError = Array.isArray(message) ? message.join?.(', ') : message || '';
            }
        }
    };

    return (
        <Observer>
            {() => (
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div></div>
                        <FormField name='email' label='почта' />
                        <PasswordInput name='password' label='Пароль' />
                        {state.responseError && (
                            <Alert className='mb-20' severity='error'>
                                {state.responseError}
                            </Alert>
                        )}
                        <div className='d-flex align-center justify-between flex-column'>
                            <Button
                                color='primary'
                                variant='contained'
                                type='submit'
                                fullWidth
                                size='large'
                                disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                Войти
                            </Button>
                            <span className={styles.noAccount}>
                                Нет аккаунта? <span onClick={onOpenRegister}>Зарегистрироваться</span>
                            </span>
                        </div>
                    </form>
                </FormProvider>
            )}
        </Observer>
    );
});
