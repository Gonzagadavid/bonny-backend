import { Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Adoption } from './schemas/adoption.schema';
import { Model } from 'mongoose';
import { DogsService } from '@dogs/dogs.service';

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
    return `This action returns all adoption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adoption`;
  }

  update(id: number, updateAdoptionDto: UpdateAdoptionDto) {
    return `This action updates a #${id} adoption`;
  }

  remove(id: number) {
    return `This action removes a #${id} adoption`;
  }
}
