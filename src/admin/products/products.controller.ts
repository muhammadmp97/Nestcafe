import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
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
        return this.productsService.createProduct(
            body.title, body.description, body.photo, body.price
        );
    }

    @Put('products/:id')
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    async update(@Param('id') id: string, @Body() body: CreateProductDto) {
        return this.productsService.updateProduct(id, body.title, body.description, body.photo, body.price);
    }

    @Delete('products/:id')
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    async delete(@Param('id') id: string) {
        this.productsService.deleteProduct(id);
    }
}
