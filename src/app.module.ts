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

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),PrismaModule, AuthModule, OrdersModule, UsersModule, ProductLineModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
