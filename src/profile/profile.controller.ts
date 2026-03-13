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
import { Profile } from './entity/profile.entity';
import { ProfileService } from './profile.service';

import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { ParsedQuery } from '../common/decorators/parse-query.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiQuery({
    name: 'select',
    type: 'string',
    required: false,
    description: 'Selecionar os campos a serem mostrados',
  })
  @ApiQuery({
    name: 'relations',
    type: 'string',
    required: false,
    description: 'Popular os relacionamentos (ex: user)',
  })
  @ApiQuery({
    name: 'order',
    type: 'string',
    required: false,
    description: 'Ordenar os resultados (ex: name.ASC ou name.DESC)',
  })
  @Get()
  //findAll(@Query() query: ProfileQueryDto): Promise<Profile[]> {
  findAll(
    @ParsedQuery() options: FindManyOptions<Profile>,
  ): Promise<Profile[]> {
    return this.profileService.findAll(options);
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Profile | null> {
    return this.profileService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.profileService.delete(id);
  }
}
