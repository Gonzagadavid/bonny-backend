import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCandidacyDto } from './dto/create-candidacy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidacy } from './schemas/candidacy.schema';
import { Model } from 'mongoose';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';

@Injectable()
export class CandidacyService {
  constructor(
    @InjectModel(Candidacy.name) private candidacyModel: Model<Candidacy>,
  ) {}
  async create(createCandidacyDto: CreateCandidacyDto) {
    const exists = await this.candidacyModel.findOne({
      user: createCandidacyDto.user,
      dog: createCandidacyDto.dog,
    });

    if (exists) {
      throw new HttpException(
        `Candidacy already registered`,
        HttpStatus.CONFLICT,
      );
    }

    return this.candidacyModel.create(createCandidacyDto);
  }

  findAllByUser(user: string) {
    return this.candidacyModel
      .find({ user })
      .populate('dog', null, Dog.name)
      .exec();
  }

  findAllByDog(dog: string) {
    return this.candidacyModel
      .find({ dog })
      .populate('user', ['-password'], User.name)
      .exec();
  }

  findAll() {
    return this.candidacyModel.find();
  }
}
