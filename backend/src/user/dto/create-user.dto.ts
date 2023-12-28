import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'username of user',
    required: true,
    example: 'tuanna'
  })
  @IsNotEmpty()
  //   @Length(6)
  @IsString()
  @Expose()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  //   @Length(6)
  @Expose()
  password: string;

  @ApiProperty({
    examples: ['Thanh Hoá', 'Nghệ An', "Hà Tĩnh"]
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string
}
