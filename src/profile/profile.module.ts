import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Profile } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UserModule],
  exports: [ProfileService],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
