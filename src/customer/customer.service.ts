import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const findCustomer = await this.findByPhone(createCustomerDto.phone)
    if (findCustomer) throw new ForbiddenException("Số điện thoại đã tồn tại!")
    const newCustomer = await this.prisma.customer.create({
      data: createCustomerDto
    })
    return newCustomer
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async findByPhone (phoneNumber: string) {
    const findCustomer = await this.prisma.customer.findUnique({
      where: {
        phone: phoneNumber
      }
    })
    // if (!findCustomer) throw new ForbiddenException("Người dùng không tồn tại")
    return findCustomer
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
