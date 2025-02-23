/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from '@dogs/dogs.controller';
import { DogsService } from '@dogs/dogs.service';
import { CreateDogDto, DogFell, DogSize } from '@dogs/dto/create-dog.dto';
import { UpdateDogDto } from '@dogs/dto/update-dog.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('DogsController', () => {
  let controller: DogsController;
  let service: DogsService;

  const mockDog = {
    id: '1',
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
    images: ['https://example.com/image1.jpg'],
    available: true,
  };

  const mockDogsService = {
    create: jest.fn().mockResolvedValue(mockDog),
    findAll: jest.fn().mockResolvedValue([mockDog]),
    findOne: jest
      .fn()
      .mockImplementation((id: string) =>
        id === '1' ? Promise.resolve(mockDog) : Promise.resolve(null),
      ),
    update: jest.fn().mockResolvedValue({ ...mockDog, name: 'Max' }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [
        {
          provide: DogsService,
          useValue: mockDogsService,
        },
      ],
    }).compile();

    controller = module.get<DogsController>(DogsController);
    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a dog', async () => {
      const dto: CreateDogDto = mockDog;
      expect(await controller.create(dto)).toEqual(mockDog);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of dogs', async () => {
      expect(await controller.findAll()).toEqual([mockDog]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a dog by ID', async () => {
      expect(await controller.findOne('1')).toEqual(mockDog);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if dog not found', async () => {
      await expect(controller.findOne('2')).rejects.toThrow(
        new HttpException('Not Found Dog with id 2', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a dog', async () => {
      const dto: UpdateDogDto = { name: 'Max' };
      expect(await controller.update('1', dto)).toEqual({
        ...mockDog,
        name: 'Max',
      });
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove a dog', async () => {
      expect(await controller.remove('1')).toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
