import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { CreateDeliverymanDto } from './dto/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';
import { Deliveryman } from './entities/deliveryman.entity';

@Injectable()
export class DeliverymanService {
  constructor(
    @InjectRepository(Deliveryman)
    private readonly deliveryRepository: Repository<Deliveryman>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createDeliverymanDto: CreateDeliverymanDto) {
    const profile = await this.profileRepository.findOne({
      where: { userId: createDeliverymanDto.userId },
      select: {
        user: {
          id: true,
          email: true,
        },
      },
      relations: {
        user: false,
        admin: false,
      },
    });

    if (!profile) {
      throw new NotFoundException(
        `Perfil com ID ${createDeliverymanDto.userId} não encontrado`,
      );
    }

    const admin = this.deliveryRepository.create({
      ...createDeliverymanDto,
      profile,
    });

    return this.deliveryRepository.save(admin);
  }

  findAll() {
    return this.deliveryRepository
      .createQueryBuilder('deliveryman')
      .leftJoinAndSelect('deliveryman.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .select(['deliveryman', 'profile', 'user.id', 'user.email'])
      .getMany();
  }

  findOne(id: number) {
    return this.deliveryRepository.findOne({ where: { userId: id } });
  }

  update(id: number, updateDeliverymanDto: UpdateDeliverymanDto) {
    return this.deliveryRepository.update(id, updateDeliverymanDto);
  }

  delete(id: number) {
    return this.profileRepository.delete(id);
  }
}
