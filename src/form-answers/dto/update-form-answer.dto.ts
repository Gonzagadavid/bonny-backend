import { PartialType } from '@nestjs/swagger';
import { CreateFormAnswerDto } from './create-form-answer.dto';

export class UpdateFormAnswerDto extends PartialType(CreateFormAnswerDto) {}
