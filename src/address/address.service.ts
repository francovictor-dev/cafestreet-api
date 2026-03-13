import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const profile = await this.profileRepository.findOne({
      where: { userId: createAddressDto.profile.userId },
    });

    if (!profile) {
      throw new Error(
        `Perfil com ID ${createAddressDto.profile.userId} não encontrado`,
      );
    }

    const address = this.addressRepository.create({ ...createAddressDto, profile });

    return this.addressRepository.save(address);
  }

  findAll() {
    return this.addressRepository.find({
      select: [
        'id',
        'street',
        'city',
        'state',
        'zipCode',
        'latitude',
        'longitude',
        'createdAt',
        'updatedAt',
        'profile',
      ],
    });
  }

  findOne(id: number) {
    return this.addressRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const result = await this.addressRepository.update(id, updateAddressDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }

    return this.addressRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}
