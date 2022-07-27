import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';

@Injectable()
export class ProductLineService {
  constructor(private prisma: PrismaService) {}

  async create(createProductLineDto: CreateProductLineDto) {
    const newProductLine = await this.prisma.productLine.create({
      data: createProductLineDto,
    });
    return newProductLine;
  }

  async findAll(pageSize: number, pageIndex: number) {
    const totalRecord = await this.prisma.productLine.count();
    const productLineList = await this.prisma.productLine.findMany({
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
    });
    const response = {
      data: productLineList,
      paging: {
        pageSize,
        pageIndex,
        totalRecord,
      },
    };
    return response;
  }

  async findOne(id: number) {
    const productLine = await this.prisma.productLine.findUnique({
      where: {
        id: id,
      },
    });
    if (!productLine) throw new ForbiddenException('ID không tồn tại!');
    return productLine;
  }

  async update(id: number, updateProductLineDto: UpdateProductLineDto) {
    const findProductByID = await this.findOne(id);
    if (!findProductByID) throw new ForbiddenException('ID không tồn tại!');
    const updatedProductLine = await this.prisma.productLine.update({
      where: {
        id: id,
      },
      data: updateProductLineDto,
    });
    // if (!updatedProductLine) throw new ForbiddenException('ID không tồn tại!');
    return updatedProductLine;
  }

  async remove(id: number) {
    const findProductByID = await this.findOne(id);
    if (!findProductByID) throw new ForbiddenException('ID không tồn tại!');
    const deletedProductLine = await this.prisma.productLine.delete({
      where: {
        id: id,
      },
    });
    return {
      message: 'Xóa thành công!',
    };
  }
}
