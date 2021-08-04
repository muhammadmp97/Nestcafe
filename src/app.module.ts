import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    MongooseModule.forRoot(`mongodb://localhost/${process.env.DATABASE_NAME}`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
