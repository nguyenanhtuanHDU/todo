import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {

    }

    async login(data: LoginUserDTO): Promise<any> {
        const userFind = await this.userService.findUserAuth(data)
        if (!userFind) {
            throw new NotFoundException('User not found')
        }
        const payload = { username: userFind.username, city: userFind.city }
        const accessToken = await this.jwtService.signAsync(payload)
        return { accessToken }
    }
}
