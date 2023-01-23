import { User } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { PrismaService } from '../../prisma/Prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userInput: CreateUserDto = {
        name: 'João da Silva',
        email: 'joão@email.com',
        password: '123456',
        role: 'USER',
      };

      const userOutput: User = {
        id: 1,
        ...userInput,
        password: undefined,
      };

      jest
        .spyOn(prisma.user, 'create')
        .mockImplementation(() => userOutput as any);
      jest.spyOn(prisma.user, 'findUnique').mockImplementation(() => null);

      const createdUser = await service.create(userInput);

      expect(createdUser).toEqual(userOutput);
    });

    it('should throw an error if user already exists', async () => {
      const user: CreateUserDto = {
        name: 'João da Silva',
        email: 'joão@email.com',
        password: hashSync('123456', 10),
        role: 'USER',
      };

      jest.spyOn(prisma.user, 'create').mockImplementation(() => user as any);
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockImplementation(() => user as any);

      try {
        await service.create({
          ...user,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('User already exists');
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersOutput: User[] = [
        {
          id: 1,
          name: 'João da Silva',
          email: 'joão@example,com',
        },
        {
          id: 1,
          name: 'Maria da Silva',
          email: 'maria@example,com',
        },
      ];

      jest
        .spyOn(prisma.user, 'findMany')
        .mockImplementation(() => usersOutput as any);

      const users = await service.findAll();

      expect(users).toEqual(usersOutput);
    });
  });

  describe('findOne', () => {
    it('should return a user with the right id', async () => {
      const idValid = 1;

      const userOutput: User = {
        id: idValid,
        name: 'João da Silva',
        email: 'joão@example,com',
        role: 'USER',
      };

      jest
        .spyOn(prisma.user, 'findUnique')
        .mockImplementation(() => userOutput as any);

      const user = await service.findOne({ id: idValid });

      expect(user).toEqual(userOutput);
    });

    it('should throw an error if user does not exist', async () => {
      const idInvalid = 1;

      jest.spyOn(prisma.user, 'findUnique').mockImplementation(() => null);

      try {
        await service.findOne({ id: idInvalid });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found');
      }
    });
  });
});
