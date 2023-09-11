import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends OmitType(PartialType(CreateItemDto), [
  'groupId',
]) {}
