import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  star: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.ratings)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Client, (client) => client.ratings)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
