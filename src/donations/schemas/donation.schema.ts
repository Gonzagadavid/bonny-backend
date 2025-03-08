import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';
import { Sponsorship } from '@sponsorship/schemas/sponsorship.schema';

export type DonationDocument = HydratedDocument<Donation>;

@Schema()
export class Donation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' })
  dog: Dog;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsorship' })
  sponsorship: Sponsorship;

  @Prop()
  value: number;

  @Prop()
  createdAt: Date;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
