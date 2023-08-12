import { Request as RequestExpress } from 'express'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class VerifyUserServiceGuard implements CanActivate {
  constructor (private readonly jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const { clientType, token } = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException()

    try {
        const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
        request.clientType = clientType
        request.token = token
        clientType === 'user' ? request.userPayload = payload : request.servicePayload = payload
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: RequestExpress): { clientType: string, token: string } {
    const authorization = request.headers.authorization as string | undefined
    const x_auth_token = request.headers['x-auth-token'] as string | undefined

    let formatType: string
    let clientType: string
    let token: string
    
    if (authorization) {
        const [type, authenticationToken] = authorization?.split(' ') ?? []
        
        formatType = type
        clientType = 'user'
        token = authenticationToken

    } else if (x_auth_token) {
        const [type, authenticationToken] = x_auth_token?.split(' ') ?? []

        formatType = type
        clientType = 'service'
        token = authenticationToken
    
    } else {
        throw new UnauthorizedException()
    }

    if (formatType !== 'Bearer') throw new UnauthorizedException()
    if (!token) throw new UnauthorizedException()

    return { clientType, token }
    
  }
}