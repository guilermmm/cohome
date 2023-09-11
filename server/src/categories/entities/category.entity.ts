import { Item } from '@prisma/client';

export class Category {
  id: string;
  name: string;
  items: Item[];
}
