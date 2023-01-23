import { Role } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: Role;
}
