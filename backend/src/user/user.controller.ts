import { Body, Controller, Delete, Get, HttpStatus, Param, ParseBoolPipe, Post, Put, Query, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { IResponse } from 'src/shared/response.interface';
import { UserGuard } from './user.guard';
import { Roles } from 'src/roles.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiBadRequestResponse, ApiConflictResponse, ApiHeader, ApiOAuth2, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { SearchUserDTO } from './dto/search-user.dto';

@ApiTags('users')
// @ApiHeader({
//     name: 'Tuan - Header',
//     description: 'Test header',
// })
@ApiSecurity('jwt')
@Controller('users')
// @UseGuards(UserGuard)
export class UserController {
    constructor(
        private userService: UserService
        // @Inject('USER_SERVICE') private readonly userService: UserService,
    ) { }

    // @UseGuards(ThrottlerGuard) // import
    // @Throttle({
    //     default: {
    //         limit: 3, // limit 3 lan goi request
    //         ttl: 1000 * 60 // trong 60 giay
    //     }
    // })
    // @ApiSecurity('oauth2')
    @Get()
    // @Roles(['admin'])
    async findAll(@Res() res: Response, @Query() query: any): Promise<any> {
        const response: IResponse<User[]> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Get all success',
            data: await this.userService.findAll(query),
            totalItem: await this.userService.getTotalUsers()
        }
        res.status(HttpStatus.OK).json(response)
    }

    @ApiResponse({ status: 200, description: 'Create user successfully created' })
    @ApiBadRequestResponse({ status: 400, description: 'Server error' })
    @ApiConflictResponse({ status: 409, description: 'User already exists' })
    @Post()
    async create(@Body() user: CreateUserDTO, @Res() res: Response): Promise<any> {
        const response: IResponse<User> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Create success',
            data: await this.userService.create(user)
        }
        res.status(HttpStatus.OK).json(response)
    }

    @Put(':id')
    async update(@Body() user: UpdateUserDTO, @Param('id') id: string, @Res() res: Response) {
        const response: IResponse<User> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Update success',
            data: await this.userService.update(id, user)
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

    @Delete()
    async deleteAll(@Res() res: Response) {
        const response: IResponse<string> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Delete success',
            data: await this.userService.deleteAll()
        }
        res.status(HttpStatus.OK).json(response)
    }
}
