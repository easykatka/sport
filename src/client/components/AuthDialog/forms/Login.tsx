import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { LoginSchema } from '../../../utils/yupSchemaValidation';

import { FormField } from '../../FormField';

interface LoginForm {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginForm> = ({
  onOpenRegister,
}) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="почта" />
          <FormField name="password" label="пароль" />
          <div className="d-flex align-center justify-between">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Войти
            </Button>
            <Button
              color="primary"
              variant="text"
              className="ml-10"
              onClick={onOpenRegister}
            >
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
