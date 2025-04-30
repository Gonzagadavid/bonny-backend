import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';

export type AdoptionDocument = HydratedDocument<Adoption>;

@Schema()
export class Adoption {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' })
  dog: Dog;

  @Prop()
  createdAt: Date;

  @Prop()
  lastCheck: Date;

  @Prop()
  deletedAt: Date;

  _id: string;
}

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);
