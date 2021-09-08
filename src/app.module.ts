import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { AdminOrdersModule } from './admin/orders/orders.module';
import { AdminProductsModule } from './admin/products/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductsModule,
    AuthModule,
    UsersModule,
    CustomerModule,
    OrdersModule,
    AdminOrdersModule,
    AdminProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
