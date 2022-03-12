import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('email введен не корректно')
    .required('Введите email'),
  password: yup
    .string()
    .min(6, 'Длина пароля не менее 6 символов')
    .required('Пароль обязателен'),
});

export const RegisterSchema = yup
  .object()
  .shape({
    fullname: yup
      .string()
      .required('Имя и Фамилия обязательны'),
  })
  .concat(LoginSchema);
