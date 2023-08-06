import { Request } from 'express'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class VerifyServiceGuard implements CanActivate {
  constructor (private readonly jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    console.log(request.headers['x-auth-token'])

    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      request.service = payload
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string {
    const x_auth_token = request.headers['x-auth-token'] as string | undefined
    const [type, token] = x_auth_token?.split(' ') ?? []
    return type === "Bearer" ? token : ''
  }
}