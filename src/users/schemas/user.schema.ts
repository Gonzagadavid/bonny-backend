import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  birthDate: string;

  @Prop()
  individualTaxpayerRegistry: string;

  @Prop()
  email: string;

  @Prop()
  cellPhone: string;

  @Prop()
  about: string;

  _id: string;
  _doc: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
