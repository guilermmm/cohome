import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Get('group/:groupId')
  findByGroup(@Param('groupId') groupId: string) {
    return this.servicesService.findByGroup(groupId);
  }

  @Get('history/:id')
  findHistory(@Param('id') id: string) {
    return this.servicesService.findHistory(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Post(':id/user/:userId')
  assignUserToItem(@Param('id') id: string, @Param('userId') userId: string) {
    return this.servicesService.assignUserToService(id, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/user')
  removeUserFromItem(@Param('id') id: string) {
    return this.servicesService.removeUserFromService(id);
  }
}
