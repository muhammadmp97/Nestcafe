import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, lowercase: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: null })
    full_name: string;

    @Prop({ default: null })
    address: string | null;

    @Prop({ default: 0 })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
