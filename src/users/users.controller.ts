import { PagingDto } from './dto/paging.dto';
import { RolesGuard } from './guard/role.guard';
import { JwtGuard } from './guard/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import Role from './role/role.enum';
import { query } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: PagingDto) {
    return this.usersService.findAll(query.pageSize, query.pageIndex);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('getById/:id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.findOne(+id, user);
  }

  @UseGuards(JwtGuard)

  @Get('me')
  getMe(@GetUser() user: User) {


    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
