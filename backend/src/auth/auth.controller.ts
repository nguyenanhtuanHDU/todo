import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { IResponse } from 'src/shared/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('google'))
    @Get('google')
    async loginGoogle(@Res() res: Response, @Req() req: Request) {
        console.log('>>> req.body: ', req.body)
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async loginGoogleCallback(@Res() res: Response, @Req() req: Request) {
        res.json(req['user'])
    }

    @Post('login')
    async login(@Body() userLogin: LoginUserDTO, @Res() res: Response): Promise<any> {
        const response: IResponse<string> = {
            status: HttpStatus.OK,
            message: 'Success',
            subMessage: 'Login ok',
            data: await this.authService.login(userLogin)
        }
        res.status(HttpStatus.OK).json(response)
    }
}
