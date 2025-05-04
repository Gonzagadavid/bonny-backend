import { Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Adoption } from './schemas/adoption.schema';
import { Model } from 'mongoose';
import { DogsService } from '@dogs/dogs.service';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectModel(Adoption.name) private AdoptionModel: Model<Adoption>,
    private dogService: DogsService,
  ) {}

  async create(createAdoptionDto: CreateAdoptionDto) {
    await this.dogService.deactivateAvailable(createAdoptionDto.dog);

    return this.AdoptionModel.create({
      ...createAdoptionDto,
      lastCheck: new Date(),
      deletedAt: null,
    });
  }

  findAll() {
    return this.AdoptionModel.find()
      .populate('user', ['-password'], User.name)
      .populate('dog', null, Dog.name)
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} adoption`;
  }

  update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    return this.AdoptionModel.updateOne({ _id: id }, { ...updateAdoptionDto });
  }

  remove(id: string) {
    return this.AdoptionModel.updateOne({ _id: id }, { deletedAt: new Date() });
  }
}
