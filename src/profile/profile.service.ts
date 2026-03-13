import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Profile } from './entity/profile.entity';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(ProfileService.name);

  findAll(options: FindManyOptions<Profile>) {
    //this.logger.log(query.relations?.split(','));
    /* const select = query.select
      ? (query.select.split(',').map((field) => field.trim()) as any)
      : [];
    const relations = query.relations
      ? query.relations.split(',').map((relation) => relation.trim())
      : [];

    const key = query.order?.split('.')[0];
    const value = query.order?.split('.')[1].toLocaleLowerCase();
    const order = { [key ?? '']: value }; */

    /* return this.profileRepository.find({
      select,
      relations,
      order,
    }); */
    return this.profileRepository.find(options);
  }

  findOne(id: number): Promise<Profile | null> {
    return this.profileRepository.findOne({ where: { userId: id } });
  }

  async create(profileData: Partial<Profile>): Promise<Profile> {
    const user = await this.userRepository.findOne({
      where: { id: profileData.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${profileData.userId} não encontrado`,
      );
    }

    const profile = this.profileRepository.create({ ...profileData, user });

    return this.profileRepository.save(profile);
  }

  async update(id: number, profileData: Partial<Profile>) {
    const result = await this.profileRepository.update(id, profileData);

    if (result.affected === 0) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
    }

    return this.profileRepository.findOneBy({ userId: id });
  }

  async delete(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
