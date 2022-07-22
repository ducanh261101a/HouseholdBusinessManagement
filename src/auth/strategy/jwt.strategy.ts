import { PrismaService } from './../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: number; username: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: payload.userId,
      },
    });
    delete user.password;
    return user;
  }
}
