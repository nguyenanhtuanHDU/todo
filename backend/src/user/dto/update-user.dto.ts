import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    example: 'tuanna',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @ApiProperty({
    examples: ['Thanh Hoá', 'Nghệ An', "Hà Tĩnh"]
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string
}