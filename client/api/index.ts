import axios from 'axios';
export const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

export class BaseService {
	downloadUrl(property) {
		
	}
}

export { AuthService } from './AuthService';
export { RoleMappingService } from './RoleMappingService';
export { RoleService } from './RoleService';
export { SourceService } from './SourceService';
export { UserService } from './UserService';





