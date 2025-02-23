import { Module } from '@nestjs/common';
import { DogsService } from '@dogs/dogs.service';
import { DogsController } from '@dogs/dogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from '@dogs/schemas/dog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }])],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
