import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import { CreateSponsorshipDto } from './dto/create-sponsorship.dto';

@Controller('sponsorship')
export class SponsorshipController {
  constructor(private readonly SponsorshipService: SponsorshipService) {}

  @Post()
  create(@Body() createSponsorshipDto: CreateSponsorshipDto) {
    return this.SponsorshipService.create(createSponsorshipDto);
  }

  @Get()
  findAll() {
    return this.SponsorshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SponsorshipService.findOne(id);
  }

  @Get('users-by-dog/:dogId')
  findSponsorsByDog(@Param('dogId') dogId: string) {
    return this.SponsorshipService.findUsersByDog(dogId);
  }

  @Get('dogs-by-user/:userId')
  findDogsByUsers(@Param('userId') userId: string) {
    return this.SponsorshipService.findDogsByUser(userId);
  }
}
