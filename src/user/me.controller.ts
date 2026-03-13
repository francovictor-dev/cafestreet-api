import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindManyOptions } from 'typeorm';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ParsedQuery } from '../common/decorators/parse-query.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('me')
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  me(
    @CurrentUser() user: { userId: number; email: string },
    @ParsedQuery() options: FindManyOptions<User>,
  ) {
    return this.userService.findOne(user.userId, options);
  }
}
