export enum CandidacyStatus {
  PENDING = 'PENDING',
  IN_PROCESS = 'IN_PROCESS',
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
