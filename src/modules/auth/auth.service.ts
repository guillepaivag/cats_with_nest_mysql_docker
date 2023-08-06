import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register ({ name, email, password }: RegisterDto): Promise<{newUser: User, token: string}> {
        const user = await this.usersService.findOneByEmail(email)
        if (user) throw new BadRequestException('')

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = await this.usersService.create({ name, email, password: hashedPassword })

        const payload = { name, email }
        const token = await this.jwtService.signAsync(payload)

        return { newUser, token }
    }

    async login ({ email, password }: LoginDto): Promise<string> {
        const user = await this.usersService.findOneByEmail(email)
        if (!user) throw new BadRequestException('')

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

        const payload = { name: user.name, email: user.email }
        return await this.jwtService.signAsync(payload)
    }
}
