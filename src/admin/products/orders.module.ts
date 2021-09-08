import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ProductsController } from 'src/admin/products/products.controller'

@Module({
    imports: [
        ProductsModule
    ],
    controllers: [
        ProductsController
    ]
})
export class AdminProductsModule { }
