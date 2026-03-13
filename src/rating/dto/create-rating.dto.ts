import { IsNotEmpty, IsNumber } from 'class-validator';
import { Client } from '../../client/entities/client.entity';
import { Product } from '../../product/entities/product.entity';

export class CreateRatingDto {
  @IsNotEmpty()
  message: string;

  @IsNumber()
  star: number;

  @IsNotEmpty()
  product: Product;

  @IsNotEmpty()
  client: Client;
}
