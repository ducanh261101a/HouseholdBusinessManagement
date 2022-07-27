import { RolesGuard } from './../users/guard/role.guard';
import { JwtGuard } from './../users/guard/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import Role from 'src/users/role/role.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('getById/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
