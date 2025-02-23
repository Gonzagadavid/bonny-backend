import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Wick', description: 'The name of people' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'wick@email.com',
    description: 'The email of people',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 36,
    description: 'The age of people',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    example: '9999999999',
    description: 'The cell phone of people',
  })
  @IsString()
  cellPhone: string;

  @ApiProperty({
    example: 'I am a retired person who loves dogs, I have already adopted two',
    description: 'Description about people',
  })
  @IsString()
  about: string;
}
