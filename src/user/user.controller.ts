import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { OwnershipGuard } from '../auth/ownership.guard';
import { ParsedQuery } from '../common/decorators/parse-query.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-product.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@ParsedQuery() options: FindManyOptions<User>): Promise<User[]> {
    return this.usersService.findAll(options);
  }

  //@ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @ParsedQuery() options: FindManyOptions<User>,
  ): Promise<User | null> {
    /*  if (req.user.userId !== +id) {
      throw new UnauthorizedException('You can only access your own user data');
    } */
    return this.usersService.findOne(id, options);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.usersService.delete(id);
  }
}
