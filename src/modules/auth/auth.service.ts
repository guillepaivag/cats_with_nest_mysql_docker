import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { Role } from './enums/role.enum';

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

        const payload = { id: newUser.id, name, email, role: Role.USER }
        const token = await this.jwtService.signAsync(payload)

        return { newUser, token }
    }

    async login ({ email, password }: LoginDto): Promise<string> {
        const user = await this.usersService.findOneByEmail(email)
        if (!user) throw new BadRequestException('')

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

        const payload = { id: user.id, name: user.name, email: user.email, role: user.role }
        return await this.jwtService.signAsync(payload)
    }

    async profile ({ id, email }: any): Promise<User> {
        if (id) return await this.usersService.findOne(id)
        else if (email) return await this.usersService.findOneByEmail(email)
        else throw new BadRequestException('')
    }
}
