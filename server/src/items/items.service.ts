import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  findAll() {
    return this.prisma.item.findMany({
      include: {
        group: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  findByGroup(groupId: string) {
    return this.prisma.item.findMany({
      where: { groupId },
      include: {
        group: true,
      },
    });
  }

  findByCategory(categoryId: string) {
    return this.prisma.item.findMany({
      where: { categoryId },
      include: {
        category: true,
      },
    });
  }

  // assignUser(id: string, userId: string) {
  //   const user = this.prisma.user.findUnique({
  //     where: { id: userId },
  //     include: {
  //       userInGroups: {
  //         include: {
  //           group: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!user) throw new NotFoundException('Usuário não encontrado');

  //   return this.prisma.item.update({
  //     where: { id },
  //     data: {
  //       user: {
  //         connect: { id: userId },
  //       },
  //     },
  //   });
  // }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  remove(id: string) {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
