import { IsNumber, IsString, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DogSize {
  BIG = 'BIG',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

export enum DogFell {
  SHORT = 'SHORT',
  LONG = 'LONG',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class CreateDogDto {
  @ApiProperty({ example: 'Rex', description: 'The name of the dog' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 4, description: 'The age of the dog' })
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    example: 'MEDIUM',
    enum: DogSize,
    description: 'The size of the dog',
  })
  @IsEnum(DogSize)
  readonly size: DogSize;

  @ApiProperty({ example: 'Labrador', description: 'The breed of the dog' })
  @IsString()
  readonly breed: string;

  @ApiProperty({ example: 'Brown', description: "The color of the dog's fur" })
  @IsString()
  readonly fellColor: string;

  @ApiProperty({
    example: 'SHORT',
    enum: DogFell,
    description: "The type of dog's fur",
  })
  @IsEnum(DogFell)
  readonly fell: DogFell;

  @ApiProperty({
    example: 'MALE',
    enum: GenderEnum,
    description: 'The dog gender',
  })
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;

  @ApiProperty({
    example: 'Friendly',
    description: 'The temperament of the dog',
  })
  @IsString()
  readonly temperament: string;

  @ApiProperty({
    example: 'For adoption',
    description: 'The current situation of the dog',
  })
  @IsString()
  readonly situation: string;

  @ApiProperty({
    example: 'Rescued from the streets',
    description: 'The history of the dog',
  })
  @IsString()
  readonly history: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Profile image URL',
  })
  @IsString()
  readonly imageProfile: string;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Additional images of the dog',
    isArray: true,
  })
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({
    example: true,
    description: 'Availability of the dog for adoption',
  })
  @IsBoolean()
  readonly available: boolean;
}
