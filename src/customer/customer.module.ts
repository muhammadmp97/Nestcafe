import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { CustomerController } from './customer.controller';

@Module({
  imports: [UsersModule],
  controllers: [CustomerController]
})
export class CustomerModule {}
