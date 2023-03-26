import { LoginDto } from 'shared/dto/login.dto';
import { RegistrationDto } from 'shared/dto/registration.dto';
import { instance } from '.';

export class AuthService {
	static async registration(dto: RegistrationDto) {
		const formData = new FormData();
		Object.keys(dto).forEach(key => formData.append(key, dto[key]));
		const { data } = await instance.post('auth/registration', formData);
		return data;
	}

	static async login({ email, password }: LoginDto) {
		const { data } = await instance.post('auth/login', { email, password });
		return data;
	}

	static async me(token: string) {
		const { data } = await instance.get('user/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	}
}