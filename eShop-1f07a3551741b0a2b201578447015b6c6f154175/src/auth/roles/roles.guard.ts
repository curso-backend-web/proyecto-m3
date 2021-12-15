import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/entities/user.entity'
import { ROLES_KEY } from './roles.decorators'
import { Role } from './role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        const { user }: { user: User } = context.switchToHttp().getRequest()
        const isRole = roles.some((role) => user.role?.includes(role))
        return Promise.resolve(isRole)
    }
}