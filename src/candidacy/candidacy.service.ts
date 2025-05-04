import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CandidacyStatus,
  CreateCandidacyDto,
} from './dto/create-candidacy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidacy } from './schemas/candidacy.schema';
import { Model } from 'mongoose';
import { User } from '@users/schemas/user.schema';
import { Dog } from '@dogs/schemas/dog.schema';
import { UpdateCandidacyStatusDto } from './dto/update-candidacy.dto';
import { AdoptionService } from '@adoption/adoption.service';

@Injectable()
export class CandidacyService {
  constructor(
    @InjectModel(Candidacy.name) private candidacyModel: Model<Candidacy>,
    private adoptionService: AdoptionService,
  ) {}
  async create(createCandidacyDto: CreateCandidacyDto) {
    const exists = await this.candidacyModel.findOne({
      user: createCandidacyDto.user,
      dog: createCandidacyDto.dog,
    });

    if (exists && exists.status === CandidacyStatus.PENDING) {
      throw new HttpException(
        `Candidacy pending already registered`,
        HttpStatus.CONFLICT,
      );
    }

    return this.candidacyModel.create({
      ...createCandidacyDto,
      createdAt: new Date(),
    });
  }

  findAllByUser(user: string) {
    return this.candidacyModel
      .find({ user })
      .populate('dog', null, Dog.name)
      .exec();
  }

  findAllByDog(dog: string) {
    return this.candidacyModel
      .find({ dog })
      .populate('user', ['-password'], User.name)
      .exec();
  }

  findAll() {
    return this.candidacyModel.find();
  }

  async updateStatus({ candidacyId, status }: UpdateCandidacyStatusDto) {
    const candidacy = await this.candidacyModel.findById(candidacyId);
    if (!candidacy) {
      throw new HttpException(`Candidacy not registered`, HttpStatus.NOT_FOUND);
    }

    if (status === CandidacyStatus.CONCLUDED) {
      return this.finishedCandidacy(candidacyId);
    }

    return this.candidacyModel.updateOne({ _id: candidacyId }, { status });
  }

  async finishedCandidacy(candidacyId: string) {
    const candidacy = await this.candidacyModel.findById(candidacyId);
    if (!candidacy || candidacy.status !== CandidacyStatus.APPROVED) {
      throw new HttpException(
        `Candidacy not registered or not approved`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.candidacyModel.updateOne(
      { _id: candidacy },
      { status: CandidacyStatus.CONCLUDED },
    );

    await this.candidacyModel.updateMany(
      { dog: candidacy.dog, status: CandidacyStatus.PENDING },
      { status: CandidacyStatus.REJECTED },
    );

    await this.adoptionService.create({
      candidacyId,
      dog: candidacy.dog as unknown as string,
      user: candidacy.user as unknown as string,
    });
  }
}
