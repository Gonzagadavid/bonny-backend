import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AnswerType } from '../dto/create-form.dto';

export type FormDocument = HydratedDocument<Form>;

  @Schema()
  export class  Alternative  {
   @Prop()
   id: string;
   @Prop()
alternativeText: string;
  } 


@Schema()
export class Question {
   @Prop()
    id: string;
   @Prop()
  question: string;
   @Prop()
  answerType: AnswerType
   @Prop()
  alternatives: Alternative[]
}



@Schema()
export class Form {
  @Prop()
  title: string;

  @Prop()
  questions: Question[];

  @Prop()
  active: boolean

  @Prop()
  createdAt: Date

  @Prop()
  createdBy: string

  _id: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
