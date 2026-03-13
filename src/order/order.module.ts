import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { Client } from '../client/entities/client.entity';
import { Deliveryman } from '../deliveryman/entities/deliveryman.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deliveryman, Client]), ClientModule],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
