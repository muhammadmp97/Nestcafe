import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IProduct } from 'src/products/product.schema';
import { ProductsService } from 'src/products/products.service';
import { CreateProductDto } from './Dto/create-product';

@Controller('admin')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post('products')
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    async store(@Body() body: CreateProductDto): Promise<IProduct> { 
        return await this.productsService.createProduct(
            body.title, body.description, body.photo, body.price
        );
    }
}
