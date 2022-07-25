import { Module } from '@nestjs/common';
import { ProductLineService } from './product-line.service';
import { ProductLineController } from './product-line.controller';

@Module({
  controllers: [ProductLineController],
  providers: [ProductLineService]
})
export class ProductLineModule {}
