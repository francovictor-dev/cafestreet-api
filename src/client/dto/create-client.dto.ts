import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
