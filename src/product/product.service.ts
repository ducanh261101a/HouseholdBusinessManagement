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
        productId: createProductDto.productId
      }
    })
    if (findOldProduct) throw new ForbiddenException("ID đã tồn tại")
    const newProduct = await this.prisma.product.create({
      data: createProductDto
    })
    if (!newProduct) throw new ForbiddenException("Đã có lỗi xảy ra! Vui lòng thử lại")
    return newProduct
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
