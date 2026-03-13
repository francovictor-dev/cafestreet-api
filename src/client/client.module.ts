import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { Profile } from '../profile/entity/profile.entity';
import { Rating } from '../rating/entities/rating.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Profile, Rating, Order])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [TypeOrmModule],
})
export class ClientModule {}
