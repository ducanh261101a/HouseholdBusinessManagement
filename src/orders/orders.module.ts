import { OrderDetailService } from './../order-detail/order-detail.service';
import { CustomerService } from './../customer/customer.service';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, CustomerService, OrderDetailService]
})
export class OrdersModule {}
