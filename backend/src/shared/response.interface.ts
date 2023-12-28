import { HttpStatus } from "@nestjs/common"

export interface IResponse<T> {
    status: HttpStatus
    message: 'Success' | 'Error'
    subMessage: string
    data: T
    totalItem?: number
} 