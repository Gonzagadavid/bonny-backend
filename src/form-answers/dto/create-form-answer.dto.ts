export class CreateFormAnswerDto {
    formVersionId: string;
    title: string;
    answers: Record<string, string | string[]>;
}
