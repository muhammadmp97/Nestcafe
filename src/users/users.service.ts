import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findByUsername(username: string): Promise<UserDocument> {
        return await this.userModel.findOne({ username }).exec();
    }

    async createUser(user: { username: string, password: string, full_name: string }): Promise<UserDocument> | null {
        const dbUser = await this.findByUsername(user.username);

        if (dbUser) {
            return null;
        }

        return await this.userModel.create(user);
    }

    async updateAddress(username: string, address: string) {
        return await this.userModel.findOneAndUpdate({ username }, { address }).exec();
    }
}
