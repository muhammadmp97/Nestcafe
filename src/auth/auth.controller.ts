import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return this.authService.registerUser(body.username, body.password, body.full_name);
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.authService.login(body.username, body.password);
    }
}
