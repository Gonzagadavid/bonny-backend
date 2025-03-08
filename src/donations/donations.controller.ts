import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get('by-user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.donationsService.findDonationsByUserId(userId);
  }

  @Get('by-dog/:dogId')
  findByDogId(@Param('dogId') dogId: string) {
    return this.donationsService.findDonationsByDogId(dogId);
  }
}
