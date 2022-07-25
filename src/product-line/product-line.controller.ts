import { PagingDto } from './../users/dto/paging.dto';
import { RolesGuard } from './../users/guard/role.guard';
import { JwtGuard } from './../users/guard/auth.guard';
import Role from '../users/role/role.enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductLineService } from './product-line.service';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('product-line')
export class ProductLineController {
  constructor(private readonly productLineService: ProductLineService) {}

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  create(@Body() createProductLineDto: CreateProductLineDto) {
    return this.productLineService.create(createProductLineDto);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll(@Query() query: PagingDto) {
    return this.productLineService.findAll(query.pageSize, query.pageIndex);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productLineService.findOne(+id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductLineDto: UpdateProductLineDto,
  ) {
    return this.productLineService.update(+id, updateProductLineDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productLineService.remove(+id);
  }
}
