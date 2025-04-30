import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CandidacyService } from './candidacy.service';
import { CreateCandidacyDto } from './dto/create-candidacy.dto';
import { UpdateCandidacyStatusDto } from './dto/update-candidacy.dto';

@Controller('candidacy')
export class CandidacyController {
  constructor(private readonly candidacyService: CandidacyService) {}

  @Post()
  create(@Body() createCandidacyDto: CreateCandidacyDto) {
    return this.candidacyService.create(createCandidacyDto);
  }

  @Get()
  findAll() {
    return this.candidacyService.findAll();
  }

  @Get('/by-user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.candidacyService.findAllByUser(id);
  }

  @Get('/by-dog/:id')
  findAllByDog(@Param('id') id: string) {
    return this.candidacyService.findAllByDog(id);
  }

  @Patch('/update-status')
  updateStatus(@Body() updateCandidacyStatusDto: UpdateCandidacyStatusDto) {
    return this.candidacyService.updateStatus(updateCandidacyStatusDto);
  }
}
