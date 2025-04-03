import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
}

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
  password: string;

  @Prop({ type: String, enum: UserRole })
  role: UserRole;

  _id: string;
  _doc: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
