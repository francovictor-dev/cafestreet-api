import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { Client } from '../../client/entities/client.entity';
import { Deliveryman } from '../../deliveryman/entities/deliveryman.entity';
import { User } from '../../user/entities/user.entity';

export enum UserType {
  ADMIN = 'admin',
  CLIENT = 'client',
  DELIVERYMAN = 'deliveryman',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  userType: UserType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Client, (client) => client.profile, {
    cascade: true,
  })
  client: Client;

  @OneToOne(() => Deliveryman, (deliveryman) => deliveryman.profile, {
    cascade: true,
  })
  deliveryman: Deliveryman;

  @OneToOne(() => Admin, (admin) => admin.profile, {
    cascade: true,
  })
  admin: Admin;

  @OneToMany(() => Address, (address) => address.profile, {
    cascade: true,
    eager: true,
  })
  addresses: Address[];
}
