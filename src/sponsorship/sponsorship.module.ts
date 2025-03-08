import { Module } from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import { SponsorshipController } from './sponsorship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sponsorship, SponsorshipSchema } from './schemas/sponsorship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sponsorship.name, schema: SponsorshipSchema },
    ]),
  ],
  controllers: [SponsorshipController],
  providers: [SponsorshipService],
  exports: [SponsorshipService],
})
export class SponsorshipModule {}
