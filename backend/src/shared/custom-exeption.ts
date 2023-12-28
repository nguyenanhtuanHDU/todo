import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomExeption extends HttpException {
    constructor() {
        super('test', HttpStatus.OK, { cause: new Error(), description: 'Some error description' })
    }
}