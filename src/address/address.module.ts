import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entity/profile.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Address])],
  exports: [AddressService],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
