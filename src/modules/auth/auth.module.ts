import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { VerifyUserGuard } from 'src/guards/verify-user.guard';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, VerifyUserGuard]
})
export class AuthModule {}