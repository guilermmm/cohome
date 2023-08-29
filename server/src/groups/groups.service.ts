import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { prisma } from 'src/utils/prisma';

@Injectable()
export class GroupsService {
  async create(createGroupDto: CreateGroupDto) {
    try {
      const { name, userId: adminId } = createGroupDto;

      return await prisma.group.create({
        data: {
          name,
          users: {
            connect: {
              id: adminId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await prisma.group.findMany({
        include: {
          users: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const group = await prisma.group.findFirst({
        where: {
          users: {
            some: {
              id,
            },
          },
        },
        include: {
          users: true,
        },
      });

      if (!group) throw new NotFoundException('Grupo não encontrado');

      return group;
    } catch (error) {
      if (error instanceof NotFoundException) return error.getResponse();
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const { name } = updateGroupDto;
    try {
      return await prisma.group.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    await prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
