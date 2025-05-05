import { Injectable } from '@nestjs/common';
import { CreateFormAnswerDto } from './dto/create-form-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormAnswer } from './schemas/form-answer.schema';
import { Model } from 'mongoose';
import { UserPayload } from 'src/auth/auth.service';
import { FormsService } from 'src/forms/forms.service';

@Injectable()
export class FormAnswersService {
  constructor(
    @InjectModel(FormAnswer.name) private formAnswerModel: Model<FormAnswer>,
    private formsService: FormsService,
  ) {}

  create(createFormAnswerDto: CreateFormAnswerDto, user: UserPayload) {
    return this.formAnswerModel.create({
      ...createFormAnswerDto,
      userId: user.userId,
      createdAt: new Date(),
      answers: JSON.stringify(createFormAnswerDto.answers),
    });
  }

  async findOneByUser(userId: string) {
    const [formAnswer] = await this.formAnswerModel
      .find({ userId })
      .sort({ createdAt: -1 });

    if (!formAnswer) {
      return null;
    }
    const forms = await this.formsService.findOne(formAnswer.formVersionId);
    return { ...formAnswer.toObject(), activeVersion: forms?.active };
  }
}
