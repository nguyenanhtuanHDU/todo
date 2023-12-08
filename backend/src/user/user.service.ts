import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './enities/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getAll(): Promise<User[]> {
        return this.userModel.find()
    }

    async create(user: CreateUserDTO): Promise<User> {
        try {
            const userFind = await this.userModel.findOne({ username: user.username })
            if (userFind) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
            }
            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword
            const createdUser = await this.userModel.create(user)
            return await createdUser.save()
        } catch (error) {
            console.log("🚀 ~ error:", error)
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const userFind = await this.userModel.findById(id)
            if (!userFind) {
                throw new HttpException(`User with id: ${id} not found`, HttpStatus.BAD_REQUEST)
            }
            const deletedUser = await this.userModel.deleteOne({ _id: id })
            return deletedUser
        } catch (error) {
            console.log("🚀 ~ error:", error)
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
