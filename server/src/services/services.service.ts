import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        name: createServiceDto.name,

        group: {
          connect: {
            id: createServiceDto.groupId,
          },
        },
        serviceData: {
          create: {
            description: createServiceDto.description,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: {
        group: true,
        serviceData: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        serviceData: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
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

  findLatestServiceData(serviceId: string) {
    return this.prisma.serviceData.findFirst({
      where: { serviceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findHistory(id: string) {
    return this.prisma.serviceData.findMany({
      where: { serviceId: id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const latestServiceData = await this.findLatestServiceData(id);

    if (!latestServiceData)
      throw new NotFoundException(`Serviço não encontrado`);

    return this.prisma.serviceData.create({
      data: {
        description:
          updateServiceDto.description || latestServiceData.description,
        service: {
          connect: {
            id,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  async assignUserToService(userId: string, serviceId: string) {
    const serviceData = await this.findLatestServiceData(serviceId);

    if (!serviceData) throw new NotFoundException(`Serviço não encontrado`);

    if (!serviceData?.userId)
      return this.prisma.serviceData.update({
        where: { id: serviceData.id },
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

    return this.prisma.serviceData.create({
      data: {
        description: serviceData.description,
        user: {
          connect: {
            id: userId,
          },
        },
        service: {
          connect: {
            id: serviceId,
          },
        },
      },
    });
  }

  async removeUserFromService(serviceId: string) {
    const serviceData = await this.findLatestServiceData(serviceId);

    if (!serviceData) throw new NotFoundException(`Serviço não encontrado`);

    if (!serviceData?.userId)
      throw new BadRequestException(
        `Serviço não está atribuído a nenhum usuário`,
      );

    return this.prisma.serviceData.create({
      data: {
        description: serviceData.description,
        service: {
          connect: {
            id: serviceId,
          },
        },
      },
    });
  }
}
