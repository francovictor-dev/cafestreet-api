import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliverymanDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
