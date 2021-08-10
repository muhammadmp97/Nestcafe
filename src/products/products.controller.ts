import { Controller, Get, Param } from '@nestjs/common';
import { IProduct } from './product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async index() {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<IProduct> {
        return await this.productsService.findOne(id);
    }
}
