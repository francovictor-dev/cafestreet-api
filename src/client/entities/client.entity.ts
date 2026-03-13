import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Profile } from '../../profile/entity/profile.entity';
import { Rating } from '../../rating/entities/rating.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  profile: Profile;

  @OneToMany(() => Rating, (rating) => rating.client)
  ratings: Rating[];

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
