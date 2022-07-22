import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor (private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
) {

  }
  async signin(dto: AuthDto) {
    // find the user by email
    console.log('dto', dto);
    
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    //if user dose not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    //compaer password
    const pwMatches = await argon.verify(user.password, dto.password);
    //if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.userId, user.email);
  }

  async signToken(
     userId: number,
     username: string,
   ): Promise<{ access_token: string }> {
     const paload = {
       userId: userId,
       username,
     };
     const secret = this.config.get('JWT_SECRET');

     const token = await this.jwt.signAsync(paload, {
       expiresIn: '15m',
       secret: secret,
     });

     return {
       access_token: token,
     };
   }
}

