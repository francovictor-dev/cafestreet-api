import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create({ ...createProductDto });

    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({
      select: [
        'ratings',
        'name',
        'id',
        'photoUrl',
        'description',
        'amount',
        'createdAt',
        'updatedAt',
      ],
      relations: ['ratings'],
    });
    /*  return this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.ratings', 'ratings')
      .select([
        'ratings',
        'name',
        'id',
        'photoUrl',
        'amount',
        'createdAt',
        'updatedAt',
      ])
      .getMany(); */
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.productRepo.update(id, updateProductDto);

    if (result.affected == 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.productRepo.findOneBy({ id });
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
