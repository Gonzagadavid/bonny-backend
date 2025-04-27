import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CandidacyStatus } from '../dto/create-candidacy.dto';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';

export type DogDocument = HydratedDocument<Candidacy>;

@Schema()
export class Candidacy {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' })
  dog: Dog;

  @Prop()
  status: CandidacyStatus;

  @Prop()
  createdAt: Date;

  _id: string;
}

export const CandidacySchema = SchemaFactory.createForClass(Candidacy);
