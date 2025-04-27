import { Injectable } from '@nestjs/common';
import { CreateFormAnswerDto } from './dto/create-form-answer.dto';
import { UpdateFormAnswerDto } from './dto/update-form-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormAnswer } from './schemas/form-answer.schema';
import { Model } from 'mongoose';
import { UserPayload } from 'src/auth/auth.service';

@Injectable()
export class FormAnswersService {
  constructor(
    @InjectModel(FormAnswer.name) private formAnswerModel: Model<FormAnswer>,
  ) {}

  create(createFormAnswerDto: CreateFormAnswerDto, user: UserPayload) {
    return this.formAnswerModel.create({
      ...createFormAnswerDto,
      userId: user.userId,
      createdAt: new Date(),
      answers: JSON.stringify(createFormAnswerDto.answers),
    });
  }

  findAll() {
    return `This action returns all formAnswers`;
  }

  async findOneByUser(userId: string) {
    const [formAnswer] = await this.formAnswerModel
      .find({ userId })
      .sort({ createdAt: -1 });

    return formAnswer;
  }

  findOne(id: number) {
    return `This action returns a #${id} formAnswer`;
  }

  update(id: number, updateFormAnswerDto: UpdateFormAnswerDto) {
    return `This action updates a #${id} formAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} formAnswer`;
  }
}
