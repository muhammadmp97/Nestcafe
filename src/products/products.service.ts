import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productsService: Model<ProductDocument>) {}

    async findAll(): Promise<Product[]> {
        return await this.productsService.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return await this.productsService.findById(id).exec();
    }
}