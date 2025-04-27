/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TestAppModule } from './test-app.module';
import { DogSize, DogFell } from '../src/dogs/dto/create-dog.dto';
import mongoose, { ConnectionStates } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { App } from 'supertest/types';

jest.setTimeout(30000);

describe('DogsController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await mongoose.connect(mongod.getUri());
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === ConnectionStates.connected) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    if (mongod) await mongod.stop();
    await app.close();
  });

  let createdDog: any;

  it('/POST dogs', async () => {
    const dogDto = {
      name: 'Rex',
      age: 4,
      size: DogSize.MEDIUM,
      breed: 'Labrador',
      fellColor: 'Brown',
      fell: DogFell.SHORT,
      temperament: 'Friendly',
      situation: 'For adoption',
      history: 'Rescued from the streets',
      imageProfile: 'https://example.com/image.jpg',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      available: true,
    };

    const response = await request(app.getHttpServer() as App)
      .post('/dogs')
      .send(dogDto)
      .expect(HttpStatus.CREATED);

    createdDog = response.body;
    expect(response.body.name).toBe(dogDto.name);
  });

  it('/GET dogs', async () => {
    const response = await request(app.getHttpServer() as App)
      .get('/dogs')
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/GET dogs/:id', async () => {
    const response = await request(app.getHttpServer() as App)
      .get(`/dogs/${createdDog._id}`)
      .expect(HttpStatus.OK);

    expect(response.body.name).toBe(createdDog.name);
  });

  it('/PATCH dogs/:id', async () => {
    const updateDto = { name: 'Buddy' };

    const response = await request(app.getHttpServer() as App)
      .patch(`/dogs/${createdDog._id}`)
      .send(updateDto)
      .expect(HttpStatus.OK);

    expect(response.body.name).toBe(updateDto.name);
  });

  it('/DELETE dogs/:id', async () => {
    await request(app.getHttpServer() as App)
      .delete(`/dogs/${createdDog._id}`)
      .expect(HttpStatus.OK);

    createdDog = null;
  });
});
