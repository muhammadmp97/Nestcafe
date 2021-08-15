import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { IOrder, Order, OrderDocument } from './orders.schema';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>, private productService: ProductsService) { }

    async findByUserId(id: string): Promise<IOrder[]> {
        const orders = await this.orderModel.find().where({ owner: id }).populate(['product', 'owner']).exec();

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

    private prepareResponse(order: any): IOrder {
        return {
            id: order._id,
            product: this.productService.prepareResponse(order.product),
            status: order.status,
            count: order.count,
        }
    }
}
