import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Profile]),
    UserModule,
    ProfileModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
