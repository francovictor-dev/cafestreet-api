import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order_item.entity';
import { OrderItemController } from './order_item.controller';
import { OrderItemService } from './order_item.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
  exports: [OrderItemService],
})
export class OrderItemModule {}
