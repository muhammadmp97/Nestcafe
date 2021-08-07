import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export interface IProduct {
    id: string;
    title: string;
    description: string;
    photo: string | null;
    price: number;
}

@Schema()
export class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    photo: string | null;

    @Prop({ required: true })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
