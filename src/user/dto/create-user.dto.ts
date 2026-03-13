import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { Profile } from '../../profile/entity/profile.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Senha123' })
  @MinLength(6)
  password: string;

  @IsOptional()
  profile?: Profile;
}
