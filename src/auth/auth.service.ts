import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateDto) {
    const hash = await argon.hash(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hash,
        email: dto.email,
        role: Role.ADMIN,
      },
    });
    delete newUser.password;
    return newUser;
  }
  async signin(dto: AuthDto) {
    // find the user by email

    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    //if user dose not exist throw exception
    if (!user)
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
    //compaer password
    const pwMatches = await argon.verify(user.password, dto.password);

    //if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
    return this.signToken(user.userId, user.username, user.email, user.role);
  }

  async signToken(
    userId: number,
    username: string,
    email: string,
    role: Role,
  ): Promise<{
    user: { userId: number; username: string; email: string; role: Role };
    access_token: string;
  }> {
    const paload = {
      userId: userId,
      username,
      role,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(paload, {
      expiresIn: '30h',
      secret: secret,
    });

    return {
      user: {
        userId,
        username,
        email,
        role,
      },
      access_token: token,
    };
  }
}
