import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
    example: '03-02-90',
    description: 'date of birth',
  })
  @IsString()
  birthDate: string;

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

  @ApiProperty({
    example: '05413682069',
    description: 'Individual taxpayer registry of people',
  })
  @IsString()
  individualTaxpayerRegistry: string;
}
