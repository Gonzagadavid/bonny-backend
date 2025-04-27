import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dog } from './schemas/dog.schema';
import { Model } from 'mongoose';

@Injectable()
export class DogsService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}

  create(createDogDto: CreateDogDto): Promise<Dog> {
    return this.dogModel.create(createDogDto);
  }

  findAll(): Promise<Dog[]> {
    return this.dogModel.find().exec();
  }

  findAllAvailable(): Promise<Dog[]> {
    return this.dogModel.find({ available: true }).exec();
  }

  findOne(id: string) {
    return this.dogModel.findById(id);
  }

  async update(id: string, updateDogDto: UpdateDogDto) {
    await this.dogModel.updateOne({ _id: id }, updateDogDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.dogModel.deleteOne({ _id: id });
  }
}
