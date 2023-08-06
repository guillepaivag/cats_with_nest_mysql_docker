import { Request as RequestExpress } from 'express';
import { Body, Controller, Post, Get, UseGuards, Request as RequestNest } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyUserGuard } from 'src/guards/verify-user.guard';

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

    @Get('protegido')
    @UseGuards(VerifyUserGuard)
    async prueba (@RequestNest() req: RequestExpress) {
        return req.headers['authorization'] ?? req.headers['x-auth-token'] ?? 'there is no token'
    }
}
