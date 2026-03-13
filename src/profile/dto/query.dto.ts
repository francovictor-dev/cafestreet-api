import { IsOptional, IsString } from 'class-validator';

export class ProfileQueryDto {
  @IsOptional()
  @IsString()
  select?: string;

  @IsOptional()
  @IsString()
  relations?: string;

  @IsOptional()
  @IsString()
  order?: string;
}
