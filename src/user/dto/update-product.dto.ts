import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { Profile } from '../../profile/entity/profile.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  profile?: Profile;
}
