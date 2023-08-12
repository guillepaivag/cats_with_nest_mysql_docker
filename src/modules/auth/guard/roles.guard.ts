import { Request as RequestExpress } from 'express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestExpress

    const roles = this.getRoles(context)
    if (!roles) return true

    const userPayload = request.userPayload
    if (!roles.includes(userPayload.role)) throw new UnauthorizedException()

    return true;
  }

  private getRoles(context: ExecutionContext): Role {
    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [context.getHandler(), context.getClass()])
    console.log('metadatos - roles', roles)
    return roles
  }
}
