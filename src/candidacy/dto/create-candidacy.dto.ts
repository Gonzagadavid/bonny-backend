export enum CandidacyStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  APPROVED = 'APPROVED',
  CONCLUDED = 'CONCLUDED',
}

export class CreateCandidacyDto {
  user: string;
  dog: string;
  status: CandidacyStatus;
}
