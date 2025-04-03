import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@users/schemas/user.schema';
import { Model } from 'mongoose';
import { encrypt } from './utils/encypt';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if (!cpf.isValid(createUserDto.individualTaxpayerRegistry)) {
      throw new HttpException(
        `${createUserDto.individualTaxpayerRegistry} is a invalid individual taxpayer registry`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const exits = await this.findByTaxpayer(
      createUserDto.individualTaxpayerRegistry,
    );
    if (exits) {
      throw new HttpException(
        `O individual taxpayer registry ${createUserDto.individualTaxpayerRegistry} is already registered`,
        HttpStatus.CONFLICT,
      );
    }
    const encryptedPassword = await encrypt(createUserDto.password);
    await this.userModel.create({
      ...createUserDto,
      password: encryptedPassword,
    });

    return this.findByTaxpayer(createUserDto.individualTaxpayerRegistry);
  }

  findAll() {
    return this.userModel.find().select(['-password']);
  }

  findOne(id: string) {
    return this.userModel.findById(id).select(['-password']);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).select(['-password']);
  }

  findByOneAuth(email: string) {
    return this.userModel.findOne({ email });
  }

  findByTaxpayer(individualTaxpayerRegistry: string) {
    return this.userModel
      .findOne({ individualTaxpayerRegistry })
      .select(['-password']);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const exits = await this.findOne(id);
    if (!exits) {
      throw new HttpException(
        `Not found user by id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateUserDto.password) {
      const encryptedPassword = await encrypt(updateUserDto.password);
      updateUserDto.password = encryptedPassword;
    }
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
