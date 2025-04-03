import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@users/schemas/user.schema';
import { IsEnum, IsString } from 'class-validator';

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
    example: '!@EXpl30',
    description: 'Password to access platform',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '05413682069',
    description: 'Individual taxpayer registry of people',
  })
  @IsString()
  individualTaxpayerRegistry: string;

  @ApiProperty({
    example: 'USER',
    description: 'The user role: ADMIN | USER | VOLUNTEER',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
