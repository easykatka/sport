import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FormField } from '../../FormField';
import { UserApi } from 'client/api';
import { setCookie } from 'nookies';
import { LoginDto } from 'shared/types/user';
import axios from 'axios';
import * as yup from 'yup';
import { inject } from 'mobx-react';
import { StoreType } from 'client/api/store';
import styles from '../AuthDialog.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginForm {
    onOpenRegister: () => void;
    onClose: () => void;
    store?: StoreType;
}

const LoginSchema = yup.object().shape({
    email: yup.string().email('email введен не корректно').required('Введите email'),
});

export const LoginForm: React.FC<LoginForm> = inject('store')(({ onOpenRegister, onClose, store }) => {
    const [responseError, setResponseError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const form = useForm<LoginDto>({ mode: 'onChange', resolver: yupResolver(LoginSchema) });

    const onShowPasswordChange = () => setShowPassword(!showPassword);

    const onSubmit = async (data: LoginDto) => {
        setResponseError(false);
        try {
            const { token, user } = await UserApi.login({ email: data.email, password: String(data.password) });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            store.user = user;
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
                    <FormControl fullWidth variant='outlined' size='small'>
                        <InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
                        <OutlinedInput
                            {...form.register('password')}
                            id='outlined-adornment-password'
                            type={showPassword ? 'text' : 'password'}
                            className='mb-20'
                            label='Пароль'
                            fullWidth
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
                            disabled={form.formState.isSubmitting}>
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
