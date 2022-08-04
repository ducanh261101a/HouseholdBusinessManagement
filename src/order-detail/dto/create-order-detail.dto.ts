import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderDetailDto {
    @IsNumber()
    @IsNotEmpty()
    orderId: string

    @IsString()
    @IsNotEmpty()
    productCode: string

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    priceEach: string
}
