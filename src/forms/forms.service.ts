import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './schemas/form.schema';
import { Model } from 'mongoose';
import { UserPayload } from 'src/auth/auth.service';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

  async create(createFormDto: CreateFormDto, user: UserPayload) {
    const exits = await this.formModel.findOne({ title: createFormDto.title });
    if (exits) {
      throw new HttpException(
        `The title ${createFormDto.title} is already registered`,
        HttpStatus.CONFLICT,
      );
    }
    return this.formModel.create({
      ...createFormDto,
      active: false,
      createdAt: new Date(),
      createdBy: user.userId,
    });
  }

  async activeForm(id: string) {
    const currentActive = await this.formModel.findOne({ active: true });
    if (currentActive) {
      await this.formModel.updateOne(
        { _id: currentActive._id },
        { active: false },
      );
    }
    await this.formModel.updateOne({ _id: id }, { active: true });
  }

  findActiveForm() {
    return this.formModel.findOne({ active: true });
  }

  findAll() {
    return this.formModel.find();
  }

  findOne(id: string) {
    return this.formModel.findById(id);
  }
}
