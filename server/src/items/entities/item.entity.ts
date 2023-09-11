import { Group } from 'src/groups/entities/group.entity';
import { Category } from '@prisma/client';

export class Item {
  id: string;
  name: string;
  value: string;
  description?: string;
  category: Category;
  group: Group;
}
