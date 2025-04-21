import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DogsService } from '@dogs/dogs.service';
import { CreateDogDto } from '@dogs/dto/create-dog.dto';
import { UpdateDogDto } from '@dogs/dto/update-dog.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @ApiBody({ type: CreateDogDto })
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Get('/available')
  findAllAvailable() {
    return this.dogsService.findAllAvailable();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dog = await this.dogsService.findOne(id);
    if (!dog) {
      throw new HttpException(
        `Not Found Dog with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return dog;
  }

  @Patch(':id')
  @ApiBody({ type: UpdateDogDto })
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(id);
  }
}
