import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const findOldProduct = await this.prisma.product.findUnique({
      where: {
        productId: createProductDto.productId,
      },
    });
    if (findOldProduct) throw new ForbiddenException('ID đã tồn tại');
    const findProductLine = await this.prisma.productLine.findUnique({
      where: {
        id: createProductDto.productType,
      },
    });
    if (!findProductLine)
      throw new ForbiddenException('productType không tồn tại');
    const newProduct = await this.prisma.product.create({
      data: createProductDto,
    });

    if (!newProduct)
      throw new ForbiddenException('Đã có lỗi xảy ra! Vui lòng thử lại');
    return newProduct;
  }

  async findAll(pageSize: number, pageIndex: number) {
    const totalRecord = await this.prisma.product.count();
    const productList = await this.prisma.product.findMany({
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
    });
    if (!productList)
      throw new ForbiddenException('Đã có lỗi xảy ra! Vui lòng thử lại');
    const response = {
      data: productList,
      paging: {
        pageSize,
        pageIndex,
        totalRecord,
      },
    };
    return response;
  }

  async findOne(id: string) {
    const productFind = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
    });
    if (!productFind) throw new ForbiddenException('ID không tồn tại');
    return productFind;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: {
        productId: id,
      },
      data: updateProductDto,
    });
    if (!updatedProduct) throw new ForbiddenException('ID không tồn tại');
    return updatedProduct;
  }

  async remove(id: string) {
    const remvedProduct = await this.prisma.product.delete({
      where: {
        productId: id,
      },
    });
    if (!remvedProduct) throw new ForbiddenException('ID không tồn tại');
    return {
      message: 'Đã xóa thành công!',
    };
  }
}
