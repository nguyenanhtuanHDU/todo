import { IsNotEmpty, IsString } from "class-validator"

export class ChatSocket {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    message: string
}