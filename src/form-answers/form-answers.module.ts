import { Module } from '@nestjs/common';
import { FormAnswersService } from './form-answers.service';
import { FormAnswersController } from './form-answers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormAnswer, FormAnswerSchema } from './schemas/form-answer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FormAnswer.name, schema: FormAnswerSchema }])],
  controllers: [FormAnswersController],
  providers: [FormAnswersService],
})
export class FormAnswersModule {}
