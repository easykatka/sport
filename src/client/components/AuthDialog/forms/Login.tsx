import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { LoginSchema } from '../../../utils/yupSchemaValidation';
import { FormField } from '../../FormField';
import Image from 'next/image';

interface LoginForm {
    onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginForm> = ({ onOpenRegister }) => {
    const form = useForm({ mode: 'onChange', resolver: yupResolver(LoginSchema) });
    const onSubmit = (data) => console.log(data);

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='login' label='почта' />
                    <FormField name='password' label='пароль' />
                    <div className='d-flex align-center justify-between flex-column fullWidth'>
                        <div>
                            <Button className='mb-15' variant='contained' fullWidth>
                                <Image src='/static/img/vk.svg' width='24' height='24' /> ВКонтакте
                            </Button>
                            <Button className='mb-15' variant='contained' fullWidth>
                                <Image src='/static/img/google.svg' width='24' height='24' /> Google
                            </Button>
                        </div>
                        <div>                        <Button
                            color='primary'
                            variant='contained'
                            type='submit'
                            size='small'
                            disabled={!form.formState.isValid}
                        >
                            Войти
                        </Button>
                        <Button color='primary' variant='text' className='ml-10' size='small' onClick={onOpenRegister}>
                            Регистрация
                        </Button>
                        </div>

                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
