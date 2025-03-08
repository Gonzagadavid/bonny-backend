import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { SponsorshipModule } from '@sponsorship/sponsorship.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './schemas/donation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
    SponsorshipModule,
  ],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
