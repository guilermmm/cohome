import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { verifyPassword } from 'src/utils/argon';
import { prisma } from 'src/utils/prisma';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(email: string, password: string) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: email,
        },
      });

      if (await verifyPassword(user.password, password)) {
        const payload = { sub: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
          userId: user.id,
        };
      } else throw new UnauthorizedException();
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return user;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        (error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2025')
      )
        throw new UnauthorizedException({
          message: 'Usuário e/ou senha incorretos',
        });

      throw new InternalServerErrorException();
    }
  }
}
