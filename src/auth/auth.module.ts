import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '30d' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
