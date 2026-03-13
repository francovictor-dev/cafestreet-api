import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { UserType } from '../entity/profile.entity';

export class CreateProfileDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEnum(UserType, {
    message: `user_type must be one of: ${Object.values(UserType).join(', ')}`,
  })
  userType: UserType;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
