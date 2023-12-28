import { PaginationDto } from "src/shared/dto/pagination.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SearchUserDTO extends PaginationDto {
    @ApiProperty()
    username: string
}