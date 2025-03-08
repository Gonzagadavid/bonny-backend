import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './schemas/donation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SponsorshipService } from '@sponsorship/sponsorship.service';
import { Dog } from '@dogs/schemas/dog.schema';
import { User } from '@users/schemas/user.schema';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name)
    private donationModel: Model<Donation>,
    @Inject(SponsorshipService)
    private sponsorshipService: SponsorshipService,
  ) {}

  async create(createDonationDto: CreateDonationDto) {
    const sponsorship = await this.sponsorshipService.findOne(
      createDonationDto.sponsorshipId,
    );
    if (!sponsorship) {
      throw new HttpException('Not found sponsorship', HttpStatus.NOT_FOUND);
    }
    const { user, dog } = sponsorship;

    return this.donationModel.create({
      ...createDonationDto,
      user: user,
      dog,
      createdAt: new Date(),
    });
  }

  findAll() {
    return this.donationModel.find();
  }

  async findDonationsByUserId(userId: string) {
    const donations = await this.donationModel
      .find({ user: userId })
      .select(['-user'])
      .populate('dog', null, Dog.name);

    if (!donations) return [];

    const dogMap = donations.reduce((dogList, donation) => {
      const { dog, value, createdAt } = donation;
      const dogData = dogList.get(dog._id);
      if (!dogData) {
        dogList.set(donation.dog._id, {
          ...dog._doc,
          donations: [{ value, createdAt }],
        });
        return dogList;
      }
      dogList.set(dog._id, {
        ...dogData,
        donations: [...dogData.donations, { value, createdAt }],
      });
      return dogList;
    }, new Map<string, Dog & { donations: { value: number; createdAt: Date }[] }>());
    const result: (Dog & {
      donations: { value: number; createdAt: Date }[];
    })[] = [];

    dogMap.forEach((value) => {
      result.push(value);
    });

    return result;
  }

  async findDonationsByDogId(dogId: string) {
    const donations = await this.donationModel
      .find({ dog: dogId })
      .select(['-dog'])
      .populate('user', null, User.name);

    if (!donations) return [];

    const userMap = donations.reduce((userList, donation) => {
      const { user, value, createdAt } = donation;
      const userData = userList.get(user._id);
      if (!userData) {
        userList.set(donation.user._id, {
          ...user._doc,
          donations: [{ value, createdAt }],
        });
        return userList;
      }
      userList.set(user._id, {
        ...userData,
        donations: [...userData.donations, { value, createdAt }],
      });
      return userList;
    }, new Map<string, User & { donations: { value: number; createdAt: Date }[] }>());
    const result: (User & {
      donations: { value: number; createdAt: Date }[];
    })[] = [];

    userMap.forEach((value) => {
      result.push(value);
    });

    return result;
  }

  findDonationsByUserIdAndDogId({
    dogId,
    userId,
  }: {
    dogId: string;
    userId: string;
  }) {
    return this.donationModel.find({ dog: dogId, user: userId });
  }
}
