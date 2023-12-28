import { PickType } from '@nestjs/mapped-types';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@ApiExtraModels()
export class LoginUserDTO {
    @ApiProperty({
        required: true,
        example: 'tuanna'
    })
    @IsNotEmpty()
    //   @Length(6)
    @IsString()
    @Expose()
    username: string;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    //   @Length(6)
    @Expose()
    password: string;
}