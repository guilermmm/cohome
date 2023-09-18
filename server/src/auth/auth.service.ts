import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { verifyPassword } from 'src/utils/argon';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      throw new UnauthorizedException('Usuário e/ou Senha incorretos.');

    const isPasswordValid = await verifyPassword(user.password, password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Usuário e/ou Senha incorretos.');

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
