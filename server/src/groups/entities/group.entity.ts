import { User } from '@prisma/client';

export class Group {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}
