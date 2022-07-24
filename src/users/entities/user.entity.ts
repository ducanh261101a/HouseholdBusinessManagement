import { Role } from '@prisma/client';
export class User {
  public userId: number;
  public username: string;
  public email: string;
  public role: Role;
}
