import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { Rating } from './entities/rating.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Rating])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
