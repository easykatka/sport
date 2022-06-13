import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FormField } from '../../inputs/FormField';
import { API } from 'client/api';
import { setCookie } from 'nookies';
import axios from 'axios';
import * as yup from 'yup';
import { inject, Observer, useLocalObservable } from 'mobx-react';
import { IStore } from 'client/api/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { RecordSelect } from 'client/components/inputs/RecordSelect';
import { UserDto } from 'server/modules/user/dto/user.dto';

interface LoginForm {
    onClose: () => void;
    store?: IStore;
}

const RegistrationSchema = yup.object().shape({
    email: yup.string().email('email введен не корректно').required('Введите email'),
    password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
    firstname: yup.string().required('Введите своё имя'),
    lastname: yup.string().required('Введите свою фамилию'),
    middlename: yup.string(),
    sourceId: yup.string().required('Укажите откуда узнали о нас'),
});

export const RegisterForm: React.FC<LoginForm> = inject('store')(({ onClose, store }) => {
    const { Auth: AuthApi } = API;
    const state = useLocalObservable(() => ({
        responseError: false,
        showPassword: false,
    }));

    const form = useForm<UserDto>({ mode: 'onChange', resolver: yupResolver(RegistrationSchema) });

    const onShowPasswordChange = () => (state.showPassword = !state.showPassword);

    const onSubmit = async (data: UserDto) => {
        state.responseError = false;
        try {
            const { user, token } = await AuthApi.registration({
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                middlename: data.middlename,
                lastname: data.lastname,
                sourceId: data.sourceId ? parseInt(data.sourceId) : null,
            });
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            store.user = user;
            onClose();
        } catch (error) {
            console.log('🚀 ~ file: Register.tsx ~ line 56 ~ onSubmit ~ error', error);
            if (axios.isAxiosError(error)) {
                const { message } = error.response.data as any;
                state.responseError = Array.isArray(message) ? message.join?.(', ') : message || '';
            }
        }
    };

    const getError = (field) => form.formState.errors[field]?.message;
    const renderLabel = (error, defaultLabel) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);

    return (
        <Observer>
            {() => (
                <FormProvider {...form}>
                    <FormField name='email' label={renderLabel(getError('email'), 'Почта')} />
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
                    <FormField name='lastname' label='Фамилия' />
                    <FormField name='firstname' label='Имя' />
                    <FormField name='middlename' label='Отчество' />
                    <RecordSelect name='sourceId' label='Откуда узнал о нас?' model={API.Source} property='name' />
                    {state.responseError && (
                        <Alert className='mb-20' severity='error'>
                            {state.responseError}
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
            )}
        </Observer>
    );
});
