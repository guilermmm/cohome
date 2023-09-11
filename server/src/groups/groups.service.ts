import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    const { name, userId: adminId } = createGroupDto;

    return await this.prisma.group.create({
      data: {
        name,
        usersInGroup: {
          create: {
            userId: adminId,
            isAdmin: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async addUserToGroup(groupId: string, userId: string) {
    const group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!group) throw new NotFoundException('Grupo não encontrado');
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return await this.prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        usersInGroup: {
          create: {
            userId,
          },
        },
      },
    });
  }

  async removeUserFromGroup(groupId: string, userId: string) {
    const group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!group) throw new NotFoundException('Grupo não encontrado');
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return await this.prisma.userInGroup.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.group.findMany({
      include: {
        usersInGroup: true,
      },
    });
  }

  async findOne(id: string) {
    const group = await this.prisma.group.findFirst({
      where: {
        usersInGroup: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        usersInGroup: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!group) throw new NotFoundException('Grupo não encontrado');

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const { name } = updateGroupDto;
    return await this.prisma.group.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(id: string) {
    await this.prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
