import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { SKIP_VALIDATION_KEY } from 'src/utils/decorators';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    @Inject(JwtService) private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipValidation = this.reflector.getAllAndOverride<boolean>(
      SKIP_VALIDATION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (skipValidation) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) return false;

    const payload = this.jwtService.decode(token) as {
      sub: string;
      email: string;
    };

    const group = await this.prisma.group.findFirst({
      where: {
        usersInGroup: {
          some: {
            userId: payload.sub,
            isAdmin: true,
          },
        },
      },
    });

    if (group?.id !== request.params.id) return false;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
