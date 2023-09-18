import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        name: createItemDto.name,
        category: {
          connect: {
            id: createItemDto.categoryId,
          },
        },
        group: {
          connect: {
            id: createItemDto.groupId,
          },
        },
        itemData: {
          create: {
            description: createItemDto.description,
            value: createItemDto.value,
          },
        },
      },
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

  async assignUserToItem(itemId: string, userId: string) {
    const itemData = await this.prisma.itemData.findFirst({
      where: { itemId },
      orderBy: { createdAt: 'desc' },
    });

    if (!itemData) throw new NotFoundException(`Item não encontrado`);

    if (!itemData?.userId)
      return this.prisma.itemData.update({
        where: { id: itemData.id },
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
  }

  removeUserFromItem(itemId: string) {
    return this.prisma.item.update({
      where: { id: itemId },
      data: {
        user: {
          disconnect: true,
        },
      },
    });
  }
}
