import { OrderDetailService } from './../order-detail/order-detail.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private customerService: CustomerService, private orderDetail: OrderDetailService) {}
  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    let customer = await this.customerService.findByPhone(createOrderDto.customerPhone)
    if (!customer) {
      customer = await this.customerService.create({
        name: createOrderDto.customerName,
        phone: createOrderDto.customerPhone,
        address: createOrderDto.customerAddress
      })
    }
    const newOrder = await this.prisma.order.create({
      data: {
        orderId: createOrderDto.orderId,
        status: createOrderDto.status,
        note: createOrderDto.note,
        addressOrder: createOrderDto.orderAddress,
        customerId: customer.customerId,
        createdBy: createOrderDto.createdBy
      }
    })
    if (!newOrder) throw new ForbiddenException("Đã có lỗi xảy ra. Vui lòng thử lại sau!")
    createOrderDto.orderDetailList.forEach(element => {
      const newOrderDetail = this.orderDetail.create({
        orderId: createOrderDto.orderId,
        productCode: element.productCode,
        quantity: element.quantity,
        priceEach: ''
      })
      if (!newOrderDetail) throw new ForbiddenException("Đã có lỗi xảy ra. Vui lòng thử lại sau!")
    })

    return {
      messsage: "Tạo mới đơn hàng thành công!"
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
