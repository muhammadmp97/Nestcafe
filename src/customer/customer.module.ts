import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { CustomerController } from './customer.controller';
import { ReverseGeocoding } from './Util/reverse-geocoding';

@Module({
  imports: [UsersModule],
  controllers: [CustomerController],
  providers: [ReverseGeocoding]
})
export class CustomerModule {}
