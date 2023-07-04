import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FilesService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User],
      autoLoadModels: true,
      define: {
        timestamps: true,
        underscored: true,
      },
    }),
    UsersModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
