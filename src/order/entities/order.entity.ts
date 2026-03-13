import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Deliveryman } from '../../deliveryman/entities/deliveryman.entity';
import { OrderItem } from '../../order_item/entities/order_item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Deliveryman, (deliveryman) => deliveryman.orders)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: Deliveryman;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItem[];
}
