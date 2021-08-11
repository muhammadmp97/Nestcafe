import { HttpException } from '@nestjs/common';
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IOrder } from './orders.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async index(@Req() req): Promise<IOrder[]> { 
        return this.ordersService.findByUserId(req.user.userId);
    }

    @Post(':id')
    @UseGuards(JwtAuthGuard)
    async store(@Param('id') productId: string, @Req() req): Promise<IOrder> {
        const order = await this.ordersService.createOrder(req.user.userId, productId);

        if (! order) {
            throw new HttpException('Something went wrong!', 500);
        }

        return order;
    }
}
