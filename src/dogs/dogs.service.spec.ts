import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from '@dogs/dogs.service';
import { getModelToken } from '@nestjs/mongoose';
import { Dog } from '@dogs/schemas/dog.schema';
import { CreateDogDto, DogFell, DogSize } from '@dogs/dto/create-dog.dto';
import { UpdateDogDto } from '@dogs/dto/update-dog.dto';

describe('DogsService', () => {
  let service: DogsService;

  const mockDog = {
    id: '1',
    name: 'Rex',
    age: 4,
    size: 'MEDIUM',
    breed: 'Labrador',
    fellColor: 'Brown',
    fell: 'SHORT',
    temperament: 'Friendly',
    situation: 'For adoption',
    history: 'Rescued from the streets',
    imageProfile: 'https://example.com/image.jpg',
    images: ['https://example.com/image1.jpg'],
    available: true,
  };

  const mockDogModel = {
    create: jest.fn().mockResolvedValue(mockDog),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockDog]),
    }),
    findById: jest.fn().mockResolvedValue(mockDog),
    updateOne: jest.fn().mockResolvedValue({ nModified: 1 }),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: getModelToken(Dog.name),
          useValue: mockDogModel,
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a dog', async () => {
      const createDogDto: CreateDogDto = {
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

      const result = await service.create(createDogDto);
      expect(result).toEqual(mockDog);
      expect(mockDogModel.create).toHaveBeenCalledWith(createDogDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of dogs', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockDog]);
      expect(mockDogModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a dog by ID', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockDog);
      expect(mockDogModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update and return the updated dog', async () => {
      const updateDogDto: UpdateDogDto = { name: 'Max' };
      mockDogModel.updateOne.mockResolvedValue({ nModified: 1 });
      const updatedDog = { ...mockDog, name: 'Max' };
      mockDogModel.findById = jest
        .fn()
        .mockResolvedValue({ ...mockDog, name: 'Max' });
      const result = await service.update('1', updateDogDto);
      expect(result).toEqual(updatedDog);
      expect(mockDogModel.updateOne).toHaveBeenCalledWith(
        { _id: '1' },
        updateDogDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a dog', async () => {
      const result = await service.remove('1');
      expect(result).toEqual({ deletedCount: 1 });
      expect(mockDogModel.deleteOne).toHaveBeenCalledWith({ _id: '1' });
    });
  });
});
