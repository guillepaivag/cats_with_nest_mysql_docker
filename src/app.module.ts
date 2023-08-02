import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,
    BreedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
