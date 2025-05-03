export enum CandidacyStatus {
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CONCLUDED = 'CONCLUDED',
}

export class CreateCandidacyDto {
  user: string;
  dog: string;
  status: CandidacyStatus;
}
