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

export const RegisterForm: React.FC<LoginForm> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullname" label="Имя и Фамили" />
        <FormField name="email" label="почта" />
        <FormField name="password" label="пароль" />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              color="primary"
              variant="contained"
              className="ml-10"
              type="submit"
              disabled={!form.formState.isValid}
              onClick={onOpenRegister}
            >
              Зарегестрироватся!
            </Button>
            <Button
              color="primary"
              variant="text"
              className="ml-10"
              onClick={onOpenLogin}
            >
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
