import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSponsorshipDto } from './dto/create-sponsorship.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sponsorship } from './schemas/sponsorship.schema';
import { Model } from 'mongoose';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';

@Injectable()
export class SponsorshipService {
  constructor(
    @InjectModel(Sponsorship.name)
    private sponsorshipModel: Model<Sponsorship>,
  ) {}

  async create(createSponsorshipDto: CreateSponsorshipDto) {
    const exists = await this.sponsorshipModel.findOne({
      dog: createSponsorshipDto.dog,
      user: createSponsorshipDto.user,
    });
    if (exists) {
      throw new HttpException(
        `This relationship is already registered`,
        HttpStatus.CONFLICT,
      );
    }
    return this.sponsorshipModel.create(createSponsorshipDto);
  }

  findAll() {
    return this.sponsorshipModel
      .find()
      .populate('user', ['-password'], User.name)
      .populate('dog', null, Dog.name)
      .exec();
  }

  findUsersByDog(dog: string) {
    return this.sponsorshipModel
      .find({ dog })
      .select(['-dog'])
      .populate('user', ['-password'], User.name)
      .exec();
  }

  findDogsByUser(user: string) {
    return this.sponsorshipModel
      .find({ user })
      .select(['-user'])
      .populate('dog', null, Dog.name)
      .exec();
  }

  findOne(id: string) {
    return this.sponsorshipModel.findById(id);
  }
}
