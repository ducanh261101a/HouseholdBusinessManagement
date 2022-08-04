import { User } from './../users/entities/user.entity';
import { OrderDetailService } from './../order-detail/order-detail.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CustomerService } from 'src/customer/customer.service';
import { isNumberString } from 'class-validator';
import Role from 'src/users/role/role.enum';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private customerService: CustomerService,
    private orderDetail: OrderDetailService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // console.log(createOrderDto);
    let customer = await this.customerService.findByPhone(
      createOrderDto.customerPhone,
    );
    if (!customer) {
      customer = await this.customerService.create({
        name: createOrderDto.customerName,
        phone: createOrderDto.customerPhone,
        address: createOrderDto.customerAddress,
      });
    }
    const findOrder = await this.prisma.order.findUnique({
      where: {
        orderId: createOrderDto.orderId,
      },
    });
    if (findOrder) throw new ForbiddenException('OrderId đã tồn tại!');
    const newOrder = await this.prisma.order.create({
      data: {
        orderId: createOrderDto.orderId,
        status: createOrderDto.status,
        note: createOrderDto.note,
        addressOrder: createOrderDto.orderAddress,
        customerId: customer.customerId,
        createdBy: createOrderDto.createdBy,
      },
    });
    if (!newOrder)
      throw new ForbiddenException('Đã có lỗi xảy ra. Vui lòng thử lại sau!');
    createOrderDto.orderDetailList.forEach((element) => {
      const newOrderDetail = this.orderDetail.create({
        orderId: createOrderDto.orderId,
        productCode: element.productCode,
        quantity: element.quantity,
        priceEach: '',
      });
      if (!newOrderDetail)
        throw new ForbiddenException('Đã có lỗi xảy ra. Vui lòng thử lại sau!');
    });

    return {
      messsage: 'Tạo mới đơn hàng thành công!',
    };
  }

  async findAll(
    pageSize: number,
    pageIndex: number,
    status: number,
    searchText: string,
    user: User,
  ) {
    let findOrder: any;
    // Lấy tất cả các trạng thái

    findOrder = await this.prisma.customer.findMany({
      where: {
        OR: [
          {
            phone: {
              contains: searchText,
            },
          },
          {
            name: {
              contains: searchText,
            },
          },
        ],
        AND: [
          {
            order: {
              every: {
                createdBy: user.role === Role.User ? user.userId : undefined,
                status: status === 0 ? null : status,
              },
            },
          },
        ],
      },
      include: {
        order: true,
      },
      skip: pageSize * (pageIndex - 1),
      take: pageSize * 1,
    });

    const totalRecord = await this.prisma.customer.count({
      where: {
        OR: [
          {
            phone: {
              contains: searchText,
            },
          },
          {
            name: {
              contains: searchText,
            },
          },
        ],
        AND: [
          {
            order: {
              every: {
                createdBy: user.role === Role.User ? user.userId : undefined,
                status: status === 0 ? null : status,
              },
            },
          },
        ],
      },
    });
    // }
    return {
      data: findOrder,
      paging: {
        pageSize,
        pageIndex,
        totalRecord: totalRecord,
      },
    };
  }

  async findOne(id: string, user: User) {
    const findOrderById = await this.prisma.order.findUnique({
      where: {
        orderId: id,
      },
      include: {
        customer: true,
        user: true,
      },
    });
    if (!findOrderById) throw new ForbiddenException('ID không tồn tại!');
    console.log(user);
    delete findOrderById.user.password;
    if (user.role == Role.User && user.userId !== findOrderById.createdBy) {
      throw new ForbiddenException(
        'Bạn không có quyền truy cập vào tài nguyên này!',
      );
    }
    return findOrderById;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
