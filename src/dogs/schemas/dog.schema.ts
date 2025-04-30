import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DogFell, DogSize, GenderEnum } from '@dogs/dto/create-dog.dto';

export type DogDocument = HydratedDocument<Dog>;

@Schema()
export class Dog {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  size: DogSize;

  @Prop()
  breed: string;

  @Prop()
  fellColor: string;

  @Prop()
  fell: DogFell;

  @Prop()
  temperament: string;

  @Prop()
  situation: string;

  @Prop()
  history: string;

  @Prop()
  imageProfile: string;

  @Prop([String])
  images: string[];

  @Prop()
  available: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  gender: GenderEnum;

  _id: string;
  _doc: Dog;
}

export const DogSchema = SchemaFactory.createForClass(Dog);
