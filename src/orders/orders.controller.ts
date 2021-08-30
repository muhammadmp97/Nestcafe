import { Controller, Delete, Get, HttpException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IOrder } from './orders.schema';
import { OrdersService } from './orders.service';

@Controller('')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get('/orders')
    @UseGuards(JwtAuthGuard)
    async index(@Req() req): Promise<IOrder[]> {
        const page = Number.parseInt(req.query.page) || 1;

        return this.ordersService.findByUserId(req.user.userId, page, 10);
    }

    @Post('/products/:id/order')
    @UseGuards(JwtAuthGuard)
    async store(@Param('id') productId: string, @Req() req): Promise<IOrder> {
        const order = await this.ordersService.createOrder(req.user.userId, productId);

        if (! order) {
            throw new HttpException('Something went wrong!', 500);
        }

        return order;
    }

    @Delete('/products/:id/order')
    @UseGuards(JwtAuthGuard)
    async destroy(@Param('id') productId: string, @Req() req): Promise<IOrder> {
        const order = await this.ordersService.deleteOrder(req.user.userId, productId);

        if (! order) {
            throw new HttpException('Something went wrong!', 500);
        }

        return order;
    }

    @Delete('/orders')
    @UseGuards(JwtAuthGuard)
    async destroyAll(@Req() req) {
        this.ordersService.deleteAll(req.user.userId);
    }
}
