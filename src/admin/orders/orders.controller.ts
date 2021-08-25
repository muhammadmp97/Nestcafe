import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from '../../orders/orders.service';

@Controller('admin')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get('orders')
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    async index(@Req() req) { 
        return await this.ordersService.findAll(Number.parseInt(req.query.page) || 1, 10);
    }
}