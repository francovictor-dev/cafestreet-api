import { ArrayNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderItemDto } from '../../order_item/dto/create-order_item.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  deliverymanId: number;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ArrayNotEmpty()
  items: CreateOrderItemDto[];
}
