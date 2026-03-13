import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { Profile } from '../../profile/entity/profile.entity';

export class CreateAddressDto {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNumberString({}, { message: 'CEP deve conter apenas números' })
  @Length(8, 8, { message: 'CEP deve ter exatamente 8 dígitos' })
  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  country: string;

  @IsOptional()
  complement: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  profile: Profile;
}
