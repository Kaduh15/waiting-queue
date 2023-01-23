import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    let user: User;
    try {
      user = await this.usersService.findOne({ email });
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(pass, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
  }
}
