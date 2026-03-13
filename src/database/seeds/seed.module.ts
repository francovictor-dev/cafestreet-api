import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService],
  imports: [DatabaseModule],
})
export class SeedModule {}
