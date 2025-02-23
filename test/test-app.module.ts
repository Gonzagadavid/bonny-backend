import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DogsModule } from '../src/dogs/dogs.module';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        return {
          uri,
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 30000,
        };
      },
    }),
    DogsModule,
  ],
})
export class TestAppModule {}
