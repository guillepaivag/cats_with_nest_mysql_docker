import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'
import { CatsModule } from './modules/cats/cats.module';
import { BreedsModule } from './modules/breeds/breeds.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { mysqlConstants, jwtConstants } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      database: mysqlConstants.database,
      host: mysqlConstants.host,
      port: Number(mysqlConstants.port),
      username: mysqlConstants.username,
      password: mysqlConstants.password,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
