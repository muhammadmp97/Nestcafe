import { BadRequestException, Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { changeAddressDto } from './Dto/change-address.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly usersService: UsersService) { }

    @Patch('address')
    @UseGuards(JwtAuthGuard)
    async updateAddress(@Req() req, @Body() body: changeAddressDto) {
        if (body.address) {
            this.usersService.updateAddress(req.user.username, body.address);
        } else if (body.lat && body.long) {
            // TODO use a reverse geocoding service
        } else {
            throw new BadRequestException();
        }
    }
}
