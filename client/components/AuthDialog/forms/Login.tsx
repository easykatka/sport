import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FormField } from '../../FormField';
import { AuthApi } from 'client/api';
import { setCookie } from 'nookies';
import { LoginDto } from 'shared/types/auth';
import axios from 'axios';
import * as yup from 'yup';
import { inject } from 'mobx-react';
import { IStore } from 'client/api/store';
import styles from '../AuthDialog.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginForm {
    onOpenRegister: () => void;
    onClose: () => void;
    store?: IStore;
}

export const LoginForm: React.FC<LoginForm> = inject('store')(({ onOpenRegister, onClose, store }) => {
    const [responseError, setResponseError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const form = useForm<LoginDto>({ mode: 'onChange' });

    const onShowPasswordChange = () => setShowPassword(!showPassword);

    const getError = (field) => form.formState.errors[field]?.message;
    const renderLabel = (error, defaultLabel) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);

    const onSubmit = async (data: LoginDto) => {
        setResponseError(false);
        try {
            const { token, user } = await AuthApi.login({ email: data.email, password: String(data.password) });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            store.user = user;
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('🚀 ~ file: Login.tsx ~ line 42 ~ onSubmit ~ error', error);

                setResponseError(error.response.data?.message?.join?.(', ') || error.response.data.message);
            }
        }
    };

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='email' label='почта' />
                    <FormControl fullWidth variant='outlined' size='small'>
                        <InputLabel htmlFor='outlined-adornment-password'>{renderLabel(getError('password'), 'Пароль')}</InputLabel>
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
                    {responseError && (
                        <Alert className='mb-20' severity='error'>
                            {responseError}
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
        </div>
    );
});
