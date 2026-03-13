import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { DeliverymanController } from './deliveryman.controller';
import { DeliverymanService } from './deliveryman.service';
import { Deliveryman } from './entities/deliveryman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deliveryman, Profile])],
  exports: [DeliverymanService],
  controllers: [DeliverymanController],
  providers: [DeliverymanService],
})
export class DeliverymanModule {}
