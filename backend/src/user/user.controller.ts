import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './enities/user.schema';
import { IResponse } from 'src/shared/response.interface';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAll(@Res() res: Response): Promise<any> {
        const response: IResponse<User[]> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Get all success',
            data: await this.userService.getAll()
        }
        res.status(HttpStatus.OK).json(response)
    }


    @Post()
    async create(@Body() user: CreateUserDTO, @Res() res: Response): Promise<any> {
        await this.userService.create(user)
        const response: IResponse<User> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Create success',
            data: null
        }
        res.status(HttpStatus.OK).json(response)
    }

    @Delete(':id')
    async delete(@Res() res: Response, @Param('id') id: string) {
        const response: IResponse<User> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Delete success',
            data: await this.userService.delete(id)
        }
        res.status(HttpStatus.OK).json(response)
    }
}
