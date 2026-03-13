import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
