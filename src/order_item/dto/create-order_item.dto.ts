import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  order?: Order;

  @IsNotEmpty()
  product?: Product;

  /*  @IsNumber()
  @IsNotEmpty()
  productId: number; */
}
