import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async register(username: string, password: string, fullName: string) {
        const user = await this.usersService.createUser({
            username: username.toLowerCase(),
            password: await bcrypt.hash(password, 10),
            full_name: fullName
        });

        if (! user) {
            throw new HttpException('This username is taken!', HttpStatus.CONFLICT);
        }

        return {
            status: 'OK',
            data: { username }
        };
    }

    async validateUser(username: string, password: string): Promise<UserDocument> | null {
        const user = await this.usersService.findByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        return null;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);

        if (! user) {
            throw new UnauthorizedException();
        }

        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user._id
            })
        };
    }
}
