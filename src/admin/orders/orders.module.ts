import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersController } from './orders.controller';

@Module({
    imports: [
        OrdersModule
    ],
    controllers: [
        OrdersController
    ]
})
export class AdminOrdersModule { }
