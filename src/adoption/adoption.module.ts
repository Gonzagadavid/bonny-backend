import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Adoption, AdoptionSchema } from './schemas/adoption.schema';
import { DogsModule } from '@dogs/dogs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Adoption.name, schema: AdoptionSchema },
    ]),
    DogsModule,
  ],
  controllers: [AdoptionController],
  providers: [AdoptionService],
  exports: [AdoptionService],
})
export class AdoptionModule {}
