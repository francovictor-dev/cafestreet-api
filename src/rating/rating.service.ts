import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
  ) {}

  create(createRatingDto: CreateRatingDto) {
    const rating = this.ratingRepo.create({ ...createRatingDto });
    return this.ratingRepo.save(rating);
  }

  findAll() {
    return this.ratingRepo
      .createQueryBuilder('rating')
      .leftJoinAndSelect('rating.client', 'client')
      .leftJoinAndSelect('rating.product', 'product')
      .select(['star', 'message', 'client', 'product', 'id'])
      .getMany();
  }

  findOne(id: number) {
    return this.ratingRepo.findOne({ where: { id } });
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return this.ratingRepo.update(id, updateRatingDto);
  }

  delete(id: number) {
    return this.ratingRepo.delete(id);
  }
}
