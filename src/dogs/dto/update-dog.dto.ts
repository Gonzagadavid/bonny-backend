import { PartialType } from '@nestjs/swagger';
import { CreateDogDto } from '@dogs/dto/create-dog.dto';

export class UpdateDogDto extends PartialType(CreateDogDto) {}
