import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { Deliveryman } from '../deliveryman/entities/deliveryman.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Deliveryman)
    private readonly deliverymanRepository: Repository<Deliveryman>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    /* const client = await this.clientRepository.findOne({
      where: { userId: createOrderDto.clientId },
    });

    const deliveryman = await this.deliverymanRepository.findOne({
      where: { userId: createOrderDto.deliverymanId },
    });

    if (!client || !deliveryman) {
      throw new NotFoundException(`cliente ou entregador não encontrados`);
    } */

    const order = this.orderRepository.create({
      ...createOrderDto,
      client: { userId: createOrderDto.clientId },
      deliveryman: { userId: createOrderDto.deliverymanId },
      items: createOrderDto.items.map((item) => ({
        quantity: item.quantity,
        product: { id: item.product?.id },
      })),
    });

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'deliveryman',
        'client',
        'items',
      ],
      relations: [
        'client',
        'client.profile',
        'deliveryman',
        'items',
        'items.product',
      ],
    });
    /* return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('order.deliveryman', 'deliveryman')
      .select(['deliveryman', 'client', 'id', 'items'])
      .getMany(); */
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, {
      client: !!updateOrderDto.clientId
        ? { userId: updateOrderDto.clientId }
        : undefined,
      deliveryman: !!updateOrderDto.deliverymanId
        ? { userId: updateOrderDto.deliverymanId }
        : undefined,
    });
  }

  delete(id: number) {
    return this.orderRepository.delete(id);
  }
}
