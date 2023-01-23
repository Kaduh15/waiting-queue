import { User } from './entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { PrismaService } from '../../prisma/Prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (hasUser) {
      throw new ConflictException('User already exists');
    }

    const { password: _, ...createdUser } = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashSync(createUserDto.password, 10),
      },
    });

    return createdUser;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
