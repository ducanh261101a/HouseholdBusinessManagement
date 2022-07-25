import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    console.log('createDto', createUserDto);
    const hash = await argon.hash(createUserDto.password);
    const newUser = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
      },
    });
    delete newUser.password;

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number, user: User) {
    // if (user.role !== 'ADMIN')
    //   throw new ForbiddenException('Ban khong co quyen');
    const findUser = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    if (!findUser) new ForbiddenException('ID khong ton tai');
    delete findUser.password;
    return findUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
