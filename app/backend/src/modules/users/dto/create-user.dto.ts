import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  /*
   * Email usado para login
   * @example joao@email.com
   */
  email: string;

  /*
   * Nome do usuário
   * @example João da Silva
   */
  name: string;

  /*
   * Senha do usuário
   * @example 123456
   */
  password: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    example: 'USER',
    enum: ['ADMIN', 'USER'],
  })
  role?: Role;
}
