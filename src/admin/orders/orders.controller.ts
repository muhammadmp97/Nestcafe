import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from '../../orders/orders.service';
import { UpdateOrderStatusDto } from './Dto/update-status';

@Controller('admin')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get('orders')
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    async index(@Req() req) { 
        const page = Number.parseInt(req.query.page) || 1;
        
        return await this.ordersService.findAll(page);
    }

    @Patch('orders/:order')
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    async changeStatus(@Param('order') id: string, @Body() body: UpdateOrderStatusDto) { 
        await this.ordersService.updateStatus(id, body.status);
    }
}
