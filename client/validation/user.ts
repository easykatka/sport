import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const userValidation = yupResolver(yup.object().shape({
	email: yup.string().email('email введен не корректно').required('Введите email'),
	password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Пароль обязателен'),
	firstname: yup.string().required('Введите своё имя'),
	lastname: yup.string().required('Введите свою фамилию'),
	middlename: yup.string(),
	sourceId: yup.number().typeError('Укажите откуда узнали о нас'),
	photo: yup.mixed().test(
		'my test',
		'Добавьте фото',
		(text) => {
			if (typeof text === 'object') {
				return true;
			} else {
				return false;
			}
		}
	)
}));