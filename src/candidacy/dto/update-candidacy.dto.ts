import { PartialType } from '@nestjs/swagger';
import { CandidacyStatus, CreateCandidacyDto } from './create-candidacy.dto';

export class UpdateCandidacyDto extends PartialType(CreateCandidacyDto) {}

export class UpdateCandidacyStatusDto {
  candidacyId: string;
  status: CandidacyStatus;
}
