import { Request as RequestExpress } from 'express';
import { Body, Controller, Post, Get, UseGuards, Request as RequestNest } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';
import { AuthAndRoles } from './decorators/auth-roles.decorator';
// import { VerifyUserGuard } from 'src/guards/verify-user.guard';
// import { Roles } from './decorators/roles.decorator';
// import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
    
    constructor (private readonly authService: AuthService) {}
    
    @Post('register')
    async register (@Body() {name, email, password}: RegisterDto): Promise<any> {
        try {
            return await this.authService.register({name, email, password})
        } catch (error) {
            console.log('Error: ', error)

            // SQL Errors
            if (error.sql && error.sqlMessage && error.sqlState) 
                return error.driverError

            return JSON.stringify(error)
        }
    }

    @Post('login')
    async login (@Body() {email, password}: LoginDto): Promise<any> {
        try {
            return await this.authService.login({email, password})
        } catch (error) {
            console.log('Error: ', error)

            // SQL Errors
            if (error.sql && error.sqlMessage && error.sqlState) 
                return error.driverError

            return JSON.stringify(error)
        }
    }

    @Get('profile')
    @AuthAndRoles([Role.USER])
    // @Roles([Role.USER])
    // @UseGuards(VerifyUserGuard, RolesGuard)
    async profile (@RequestNest() req: RequestExpress) {
        const userPayload = req.userPayload
        const user = await this.authService.profile({ id: userPayload.id })
        delete user.password

        return user
    }
}
