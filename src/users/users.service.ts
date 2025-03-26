import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const exits = await this.findByTaxpayer(
      createUserDto.individualTaxpayerRegistry,
    );
    if (exits) {
      throw new HttpException(
        `O individual taxpayer registry ${createUserDto.individualTaxpayerRegistry} is already registered`,
        HttpStatus.CONFLICT,
      );
    }
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findByTaxpayer(individualTaxpayerRegistry: string) {
    return this.userModel.findOne({ individualTaxpayerRegistry });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
