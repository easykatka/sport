import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().email('email введен не корректно').required('Введите email'),
    password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
});

export const RegistrationSchema = yup.object().shape({
    email: yup.string().email('email введен не корректно').required('Введите email'),
    password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
    firstName: yup.string().required('Введите своё имя'),
    lastName: yup.string().required('Введите свою фамилию'),
    middleName: yup.string().required('Введите своё отчество'),
});
