import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from 'src/utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashPassword } from 'src/utils/argon';
@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const { password, name, email } = createUserDto;
    const hashedPassword = await hashPassword(password);

    try {
      return await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new HttpException('E-mail já em uso.', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll() {
    try {
      return prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    console.log(id);
    try {
      return await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2025')
          throw new HttpException(
            'Usuário não encontrado',
            HttpStatus.NOT_FOUND,
          );
        else
          throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, email } = updateUserDto;
    try {
      return prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2025')
          throw new HttpException(
            'Usuário não encontrado',
            HttpStatus.NOT_FOUND,
          );
        else
          throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(id: string) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2025')
          throw new HttpException(
            'Usuário não encontrado',
            HttpStatus.NOT_FOUND,
          );
        else
          throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
