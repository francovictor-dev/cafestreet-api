import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const profile = await this.profileRepository.findOne({
      where: { userId: createClientDto.userId },
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
        `Perfil com ID ${createClientDto.userId} não encontrado`,
      );
    }

    const admin = this.clientRepository.create({ ...createClientDto, profile });

    return this.clientRepository.save(admin);
  }

  findAll() {
    return this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .select(['client', 'profile', 'user.id', 'user.email'])
      .getMany();
  }

  findOne(id: number) {
    return this.clientRepository.findOne({ where: { userId: id } });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  delete(id: number) {
    return this.clientRepository.delete(id);
  }
}
