import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { RegisterSchema } from '../../../utils/yupSchemaValidation';
import { FormField } from '../../FormField';

interface LoginForm {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
}

export const RegisterForm: React.FC<LoginForm> = ({ onOpenRegister, onOpenLogin }) => {
    const form = useForm({ mode: 'onChange', resolver: yupResolver(RegisterSchema) });

    const onSubmit = async (data) => {
        let res = await fetch('http://localhost:3000/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ login: data.email, password: data.password }),
        });
        res = await res.json();
        console.log(res);
    };

    return (
        <div>
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
                            disabled={!form.formState.isValid}
                            onClick={onOpenRegister}>
                            Зарегестрироватся
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
