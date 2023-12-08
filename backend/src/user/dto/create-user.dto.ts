import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  //   @Length(6)
  @IsString()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()

  //   @Length(6)
  @Expose()
  password: string;

  @IsNotEmpty()
  @IsString()

  @Expose()
  confirmPassword: string;
}
