import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/product.schema';
import { User } from 'src/users/user.schema';

export type OrderDocument = Order & Document;

export interface IOrder {
    id: string;
    product: object;
    status: string;
    count: number;
}

@Schema()
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: Product;

    @Prop({ default: 1 })
    count: number;
    
    @Prop({ default: 'pending' })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
