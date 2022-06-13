import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FormField } from '../inputs/FormField';
import { API } from 'client/api';
import { setCookie } from 'nookies';
import axios from 'axios';
import { inject, Observer, useLocalObservable, useObserver } from 'mobx-react';
import { IStore } from 'client/api/store';
import styles from './AuthDialog.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginDto } from 'server/modules/auth/dto/login.dto';

interface LoginForm {
    onOpenRegister: () => void;
    onClose: () => void;
    store?: IStore;
}

export const LoginForm: React.FC<LoginForm> = inject('store')(({ onOpenRegister, onClose, store }) => {
    const { Auth: AuthApi } = API;
    const state = useLocalObservable(() => ({
        responseError: false,
        showPassword: false,
    }));
    const form = useForm<LoginDto>({ mode: 'onChange' });

    const onShowPasswordChange = () => (state.showPassword = !state.showPassword);

    const getError = (field) => form.formState.errors[field]?.message;
    const renderLabel = (error, defaultLabel) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);

    const onSubmit = async (data: LoginDto) => {
        state.responseError = false;
        try {
            const { token, user } = await AuthApi.login({ email: data.email, password: String(data.password) });
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
                        <FormControl fullWidth variant='outlined' size='small'>
                            <InputLabel htmlFor='outlined-adornment-password'>{renderLabel(getError('password'), 'Пароль')}</InputLabel>
                            <OutlinedInput
                                {...form.register('password')}
                                id='outlined-adornment-password'
                                type={state.showPassword ? 'text' : 'password'}
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
                                            {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
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
