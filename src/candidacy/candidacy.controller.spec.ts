import { Test, TestingModule } from '@nestjs/testing';
import { CandidacyController } from './candidacy.controller';
import { CandidacyService } from './candidacy.service';

describe('CandidacyController', () => {
  let controller: CandidacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidacyController],
      providers: [CandidacyService],
    }).compile();

    controller = module.get<CandidacyController>(CandidacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
