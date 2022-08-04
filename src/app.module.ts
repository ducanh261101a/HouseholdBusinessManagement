import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ProductLineModule } from './product-line/product-line.module';
import { ProductModule } from './product/product.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),PrismaModule, AuthModule, OrdersModule, UsersModule, ProductLineModule, ProductModule, OrderDetailModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
