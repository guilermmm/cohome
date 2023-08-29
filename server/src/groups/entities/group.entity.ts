import { User } from '@prisma/client';

export class Group {
  id: number;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}
