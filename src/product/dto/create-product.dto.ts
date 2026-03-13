import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photoUrl: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  amount: number;
}
