import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entity/profile.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @OneToOne(() => Profile, (profile) => profile.admin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  profile: Profile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
