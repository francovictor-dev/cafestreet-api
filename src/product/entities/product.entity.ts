import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rating } from '../../rating/entities/rating.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'photo_url' })
  photoUrl: string;

  @Column('double precision')
  amount: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];

  /* @ManyToMany(() => OrderItem, (orderItem) => orderItem.products)
  orderItems: OrderItem[]; */
}
