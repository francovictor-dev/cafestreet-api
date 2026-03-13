import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { OrderItem } from './entities/order_item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepo.create({ ...createOrderItemDto });
    return this.orderItemRepo.save(orderItem);
  }

  findAll() {
    return this.orderItemRepo
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.products', 'products')
      .leftJoinAndSelect('orderItem.order', 'order')
      .select(['products', 'id', 'photoUrl', 'order', 'createdAt', 'updatedAt'])
      .getMany();
  }

  findOne(id: number) {
    return this.orderItemRepo.findOne({ where: { id } });
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemRepo.update(id, updateOrderItemDto);
  }

  delete(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
