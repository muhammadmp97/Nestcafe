import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async index() {
        return await this.productService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return await this.productService.findOne(id);
    }
}
