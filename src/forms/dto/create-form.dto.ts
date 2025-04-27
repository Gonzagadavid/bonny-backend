export enum AnswerType {
  ALTERNATIVE = 'ALTERNATIVE',
  MULTIPLE = 'MULTIPLE',
  TEXT = 'TEXT',
}

export type Alternative = {
  id: string;
  alternativeText: string;
};

export interface Question {
  id: string;
  question: string;
  answerType: AnswerType;
  alternatives: Alternative[];
}

export class CreateFormDto {
  title: string;
  questions: Question[];
}
