import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../modules/auth/requestWithUser.interface';
import { jwtAuthGuard } from './jwt.guard';

export const RoleGuard = (role: string): Type<CanActivate> => {
	class RoleGuardMixin extends jwtAuthGuard {
		async canActivate(context: ExecutionContext) {
			await super.canActivate(context);
			const request = context.switchToHttp().getRequest<RequestWithUser>();
			const user = request.user;
			return user?.roles?.some(({ role }) => role.name === 'admin');
		}
	}

	return mixin(RoleGuardMixin);
};
