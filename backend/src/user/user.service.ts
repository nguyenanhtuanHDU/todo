import { BadRequestException, ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Cron, Interval } from '@nestjs/schedule';
import { FindUser } from './dto/find-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppController } from 'src/app.controller';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }

    async findUserAuth(data: FindUser): Promise<User> {
        const user = await this.userModel.findOne({ username: data.username })
        if (!user) {
            throw new NotFoundException("User not found")
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid password")
        }
        return user
    }

    // @Cron('3 * * * * *') // chạy lại sau mỗi 3s
    // handleCron() {
    //     console.log('kkk')
    // }

    // @Interval(1000)
    // handleInterval(){
    //     console.log('interval')
    // }

    // @Interval(1000)
    async findAll(query: any): Promise<any> {
        const { page, limit, username, sortBy } = query;
        // this.logger.log('Calling getHello()', AppController.name);
        // this.logger.debug('Calling getHello()', AppController.name);
        // this.logger.verbose('Calling getHello()', AppController.name);
        // this.logger.warn('Calling getHello()', AppController.name);
        const data = await this.userModel.find({ username: { $regex: username } }).sort('' + sortBy).skip((page - 1) * limit).limit(limit)
        return data
    }

    async getTotalUsers(): Promise<number> {
        return (await this.userModel.find()).length
    }

    async create(user: CreateUserDTO): Promise<User> {
        try {
            const userFind = await this.userModel.findOne({ username: user.username })
            if (userFind) {
                throw new ConflictException('User already exists')
            }
            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword
            return await this.userModel.create(user)

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, command: UpdateUserDTO): Promise<any> {
        try {
            const userFind = await this.userModel.findById(id)
            if (!userFind) {
                throw new NotFoundException('User not found')
            }
            return await this.userModel.findByIdAndUpdate(id, command, { new: true })
        } catch (error) {
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

    async deleteAll(): Promise<string> {
        try {
            await this.userModel.deleteMany({})
            return null
        } catch (error) {
            console.log("🚀 ~ error:", error)
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
