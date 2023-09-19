import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddUserDto } from './dto/add-user.dto';

@Controller('groups')
// @UseGuards(GroupsGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Get(':id/users')
  findUsersInGroup(@Param('id') id: string) {
    return this.groupsService.findUsersInGroup(id);
  }

  @Post(':id/user')
  addUserToGroup(@Param('id') id: string, @Body() addUserDto: AddUserDto) {
    return this.groupsService.addUserToGroup(id, addUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/user/:userId')
  removeUserFromGroup(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.removeUserFromGroup(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
