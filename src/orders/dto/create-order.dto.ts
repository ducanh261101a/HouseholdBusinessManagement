import { CreateOrderDetailDto } from './../../order-detail/dto/create-order-detail.dto';
import {  IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    orderId: string

    @IsString()
    @IsNotEmpty()
    customerPhone: string

    @IsString()
    @IsNotEmpty()
    customerName: string

    @IsString()
    @IsNotEmpty()
    customerAddress: string

    @IsNumber()
    @IsNotEmpty()
    createdBy: number

    @IsNumber()
    @IsNotEmpty()
    status: number

    @IsString()
    @IsNotEmpty()
    note: string

    @IsString()
    @IsNotEmpty()
    orderAddress: string

    // @IsDate()
    // @IsEmpty()
    returnDate: Date

    // @IsDate()
    // @IsEmpty()
    rentDate: Date

    @IsNotEmpty()
    orderDetailList: Array<CreateOrderDetailDto>

}
