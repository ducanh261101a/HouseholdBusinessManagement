import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),PrismaModule, AuthModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
