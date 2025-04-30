import { Module } from '@nestjs/common';
import { CandidacyService } from './candidacy.service';
import { CandidacyController } from './candidacy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidacy, CandidacySchema } from './schemas/candidacy.schema';
import { AdoptionModule } from '@adoption/adoption.module';

@Module({
  imports: [
    AdoptionModule,
    MongooseModule.forFeature([
      { name: Candidacy.name, schema: CandidacySchema },
    ]),
  ],
  controllers: [CandidacyController],
  providers: [CandidacyService],
})
export class CandidacyModule {}
