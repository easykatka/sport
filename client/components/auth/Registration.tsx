import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button } from '@mui/material';
import { FormField } from '../inputs/FormField';
import { AuthService, SourceService } from 'client/api';
import { setCookie } from 'nookies';
import axios from 'axios';
import { inject } from 'mobx-react';
import { IStore } from 'client/api/appStore';
import { RecordSelect } from 'client/components/inputs/RecordSelect';
import { UserDto } from 'shared/dto/user.dto';
import { ImageInput } from '../inputs';
import { PasswordInput } from '../inputs/PasswordInput';
import { userValidation } from 'client/validation/user';

interface LoginForm {
    onClose: () => void;
    store?: IStore;
}
export const RegisterForm: React.FC<LoginForm> = inject('store')(({ onClose, store }) => {
    const [responseError, setResponseError] = useState(null);

    const form = useForm<UserDto>({ mode: 'onChange', resolver: userValidation });

    const onSubmit = async (data: UserDto) => {
        setResponseError(false);
        try {
            const { user, token } = await AuthService.registration(data);
            setCookie(null, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            store.user = user;
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message } = error.response.data as any;
                setResponseError(Array.isArray(message) ? message.join?.(', ') : message || '');
            }
        }
    };

    return (
        <FormProvider {...form}>
            <FormField name='email' label='Почта' />
            <PasswordInput name='password' label='Пароль' />
            <FormField name='lastname' label='Фамилия' />
            <FormField name='firstname' label='Имя' />
            <FormField name='middlename' label='Отчество' />
            <RecordSelect name='sourceId' label='Откуда узнал о нас?' service={SourceService} property='name' />
            <ImageInput name='photo' label='Фото' width={250} height={250} title='Добавить фото' />

            {responseError && (
                <Alert className='mb-20' severity='error'>
                    {responseError}
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
    );
});
