import { User } from './../users/entities/user.entity';
import { ParamsDto } from './dto/params.dto';
import { JwtGuard } from './../users/guard/auth.guard';
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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetUser } from 'src/auth/decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Query() query: ParamsDto, @GetUser() user: User) {
    return this.ordersService.findAll(
      query.pageSize,
      query.pageIndex,
      query.status,
      query.searchText,
      user,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('getById/:id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.ordersService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
