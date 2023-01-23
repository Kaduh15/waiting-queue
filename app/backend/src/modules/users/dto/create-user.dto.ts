import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  /*
   * Email usado para login
   * @example joao@email.com
   */
  @IsEmail()
  email: string;

  /*
   * Nome do usuário
   * @example João da Silva
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /*
   * Senha do usuário
   * @example 123456
   */
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    example: 'USER',
    enum: ['ADMIN', 'USER'],
  })
  @IsString()
  role?: Role;
}
