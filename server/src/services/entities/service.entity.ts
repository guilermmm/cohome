import { Group } from '@prisma/client';

export class Service {
  id: string;
  name: string;
  description?: string;
  group: Group;
}
