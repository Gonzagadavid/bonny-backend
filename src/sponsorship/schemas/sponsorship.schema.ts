import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';

export type SponsorshipDocument = HydratedDocument<Sponsorship>;

@Schema()
export class Sponsorship {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' })
  dog: Dog;
}

export const SponsorshipSchema = SchemaFactory.createForClass(Sponsorship);
