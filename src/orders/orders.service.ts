import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { IOrder, Order, OrderDocument } from './orders.schema';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>, private productService: ProductsService) { }

    async findAll(page: number = 1, perPage: number = 10): Promise<OrderDocument[]> {
        const skip = (page <= 1) ? 0 : (page - 1) * perPage;

        const orders = await this.orderModel.find()
            .limit(perPage)
            .skip(skip)
            .populate(['product', 'owner'])
            .exec();

        return orders;
    }

    async findByUserId(id: string, page: number = 1, perPage: number = 10): Promise<IOrder[]> {
        const skip = (page <= 1) ? 0 : (page - 1) * perPage;

        const orders = await this.orderModel.find()
            .where({ owner: id })
            .limit(perPage)
            .skip(skip)
            .populate(['product', 'owner'])
            .exec();

        let result = [];
        for (const order of orders) {
            result.push(this.prepareResponse(order));
        }

        return result;
    }

    async createOrder(userId: string, productId: string): Promise<IOrder> {
        const order = await this.orderModel.findOneAndUpdate(
            { owner: new ObjectId(userId), product: new ObjectId(productId) },
            { $inc: { count: 1 } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).populate('product').exec();

        return this.prepareResponse(order); 
    }

    async deleteOrder(userId: string, productId: string): Promise<IOrder> {
        const query = { owner: new ObjectId(userId), product: new ObjectId(productId) };

        const order = await this.orderModel.findOneAndUpdate(
            query,
            { $inc: { count: -1 } },
            { new: true }
        ).populate('product').exec();

        if (order.count < 1) {
            this.orderModel.deleteOne(query).exec();
        }

        return this.prepareResponse(order); 
    }

    async deleteAll(userId: string) {
        this.orderModel.deleteMany({ owner: new ObjectId(userId) }).exec();
    }

    private prepareResponse(order: any): IOrder {
        return {
            id: order._id,
            product: this.productService.prepareResponse(order.product),
            status: order.status,
            count: order.count,
        }
    }
}
