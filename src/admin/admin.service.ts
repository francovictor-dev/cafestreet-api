import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const profile = await this.profileRepository.findOne({
      where: { userId: createAdminDto.userId },
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
        `Perfil com ID ${createAdminDto.userId} não encontrado`,
      );
    }

    const admin = this.adminRepository.create({ ...createAdminDto });

    return this.adminRepository.save(admin);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .select(['admin', 'profile', 'user.id', 'user.email'])
      .getMany();
  }

  findOne(id: number): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { userId: id } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<void> {
    await this.adminRepository.update(id, updateAdminDto);
  }

  async delete(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
