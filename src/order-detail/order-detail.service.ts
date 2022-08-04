import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const newOrderDetail = await this.prisma.orderDetail.create({
      data: createOrderDetailDto
    })
    if (!newOrderDetail) throw new ForbiddenException("Đã có lỗi xảy ra. Vui lòng liên hệ Quản trị viên để được xử lý!")
    return newOrderDetail
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
