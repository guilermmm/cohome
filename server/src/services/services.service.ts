import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: {
        group: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  findByGroup(groupId: string) {
    return this.prisma.service.findMany({
      where: { groupId },
      include: {
        group: true,
      },
    });
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  assignUserToService(userId: string, serviceId: string) {
    return this.prisma.item.update({
      where: { id: serviceId },
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  removeUserFromService(serviceId: string) {
    return this.prisma.item.update({
      where: { id: serviceId },
      data: {
        user: {
          disconnect: true,
        },
      },
    });
  }
}
