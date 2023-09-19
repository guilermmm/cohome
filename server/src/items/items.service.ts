import {
  BadRequestException,
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
        itemData: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
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

  findLatestItemData(itemId: string) {
    return this.prisma.itemData.findFirst({
      where: { itemId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findHistory(itemId: string) {
    return this.prisma.itemData.findMany({
      where: { itemId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const itemData = await this.findLatestItemData(id);

    if (!itemData) throw new NotFoundException(`Item não encontrado`);

    return this.prisma.itemData.create({
      data: {
        description: updateItemDto.description || itemData.description,
        value: updateItemDto.value || itemData.value,
        item: {
          connect: {
            id,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.item.delete({
      where: { id },
    });
  }

  async assignUserToItem(itemId: string, userId: string) {
    const itemData = await this.findLatestItemData(itemId);

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

    return this.prisma.itemData.create({
      data: {
        description: itemData.description,
        value: itemData.value,
        user: {
          connect: {
            id: userId,
          },
        },
        item: {
          connect: {
            id: itemId,
          },
        },
      },
    });
  }

  async removeUserFromItem(itemId: string) {
    const itemData = await this.findLatestItemData(itemId);

    if (!itemData) throw new NotFoundException(`Item não encontrado`);

    if (!itemData?.userId)
      throw new BadRequestException(`Item não está atribuído a nenhum usuário`);

    return this.prisma.itemData.create({
      data: {
        description: itemData.description,
        value: itemData.value,
        item: {
          connect: {
            id: itemId,
          },
        },
      },
    });
  }
}
