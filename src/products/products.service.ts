import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, IProduct } from './product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async findAll(): Promise<IProduct[]> {
        let products = await this.productModel.find().exec();

        let result = [];
        for (const product of products) {
            result.push(this.prepareResponse(product));
        }

        return result;
    }

    async findOne(id: string): Promise<IProduct> {
        let product = await this.productModel.findById(id).exec();

        return this.prepareResponse(product);
    }

    prepareResponse(product: any): IProduct {
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            photo: product.photo,
            price: product.price,
        }
    }

    async create(title: string, description: string, photo: string, price: number): Promise<IProduct> {
        let product = await this.productModel.create({
            title, description, photo, price
        });

        return this.prepareResponse(product);
    }

    async update(id: string, title: string, description: string, photo: string, price: number): Promise<IProduct> {
        let product = await this.productModel.findOneAndUpdate(
            { _id: id },
            { title, description, photo, price },
            { new: true }
        ).exec();

        return this.prepareResponse(product);
    }

    async delete(id: string) {
        this.productModel.deleteOne({ _id: id }).exec();
    }
}