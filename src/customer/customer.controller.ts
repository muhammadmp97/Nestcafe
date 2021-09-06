import { BadRequestException, Body, Controller, Get, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { changeAddressDto } from './Dto/change-address.dto';
import { ReverseGeocoding } from './Util/reverse-geocoding';

@Controller('customer')
export class CustomerController {
    constructor(private readonly usersService: UsersService, private readonly reverseGeocoding: ReverseGeocoding) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req) {
        return this.usersService.findByUsername(req.user.username);
    }

    @Patch('address')
    @UseGuards(JwtAuthGuard)
    async updateAddress(@Req() req, @Body() body: changeAddressDto) {
        if (body.address) {
            this.usersService.updateAddress(req.user.username, body.address);
        } else if (body.lat && body.long) {
            const address = await this.reverseGeocoding.getAddress(body.lat, body.long);
            this.usersService.updateAddress(req.user.username, address);
        } else {
            throw new BadRequestException();
        }
    }
}
