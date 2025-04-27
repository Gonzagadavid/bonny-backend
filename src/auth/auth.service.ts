import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@users/schemas/user.schema';

export type UserPayload = Omit<User, 'password' | '_id' | '_docs'> & {
  userId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailUser: string, pass: string): Promise<any> {
    const user = await this.usersService.findByOneAuth(emailUser);
    if (!user) return null;
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;
    const {
      name,
      email,
      role,
      individualTaxpayerRegistry,
      cellPhone,
      _id: userId,
    } = user;
    return { name, email, role, individualTaxpayerRegistry, cellPhone, userId };
  }
  login(userPayload?: UserPayload) {
    return {
      access_token: this.jwtService.sign(userPayload as unknown as string),
    };
  }
}
