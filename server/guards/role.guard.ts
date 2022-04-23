import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../auth/requestWithUser.interface';
import { jwtAuthGuard } from './jwt.guard';

export const RoleGuard = (role: string): Type<CanActivate> => {
    class RoleGuardMixin extends jwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            console.log('ds');
            await super.canActivate(context);
            console.log('hered');
            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;
            console.log(user, 'user');
            return true;
        }
    }

    return mixin(RoleGuardMixin);
};
