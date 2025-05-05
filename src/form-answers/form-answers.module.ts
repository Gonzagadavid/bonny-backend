import { Module } from '@nestjs/common';
import { FormAnswersService } from './form-answers.service';
import { FormAnswersController } from './form-answers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormAnswer, FormAnswerSchema } from './schemas/form-answer.schema';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  imports: [
    FormsModule,
    MongooseModule.forFeature([
      { name: FormAnswer.name, schema: FormAnswerSchema },
    ]),
  ],
  controllers: [FormAnswersController],
  providers: [FormAnswersService],
})
export class FormAnswersModule {}
