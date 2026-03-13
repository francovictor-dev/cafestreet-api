import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-product.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(options: FindManyOptions<User>) {
    return this.userRepository.find({
      ...options,
      select: options.select || ['email', 'id', 'createdAt', 'updatedAt'],
    });
    /* return this.userRepository.find({
      select: ['email', 'id', 'createdAt', 'updatedAt'],
      relations: {
        profile: {
          admin: true,
        },
      },
    }); */
  }

  findOne(id: number, options?: FindManyOptions<User>) {
    return this.userRepository.findOne({
      where: { id },
      ...options,
      select: options?.select || ['email', 'id', 'createdAt', 'updatedAt'],
    });
  }

  async create(userData: CreateUserDto) {
    const passwordHash = await argon2.hash(userData.password);
    const user = this.userRepository.create(userData);
    user.password = passwordHash;
    return this.userRepository.save(user);
  }

  async update(id: number, userData: UpdateUserDto) {
    let passwordHash = null;
    if (userData.password) {
      passwordHash = await argon2.hash(userData.password);
    }
    !!passwordHash && (userData.password = passwordHash);
    const result = await this.userRepository.update(id, userData);

    if (result.affected == 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
