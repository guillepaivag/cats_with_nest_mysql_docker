import { Request as RequestExpress } from 'express'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class VerifyUserGuard implements CanActivate {
  constructor (private readonly jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      request.token = token
      request.userPayload = payload
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: RequestExpress): string {
    const authorization = request.headers.authorization
    const [type, token] = authorization?.split(' ') ?? []
    return type === "Bearer" ? token : ''
  }
}