import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class PaginationDto {
    @ApiProperty({
        example: 1
    })
    @IsNotEmpty()
    @Expose()
    page: string

    @ApiProperty({
        example: 10
    })
    @IsNotEmpty()
    @Expose()
    limit: string
}