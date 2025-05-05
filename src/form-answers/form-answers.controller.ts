import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FormAnswersService } from './form-answers.service';
import { CreateFormAnswerDto } from './dto/create-form-answer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@users/schemas/user.schema';
import { UserPayload } from 'src/auth/auth.service';

@Controller('form-answers')
export class FormAnswersController {
  constructor(private readonly formAnswersService: FormAnswersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.USER)
  create(
    @Body() createFormAnswerDto: CreateFormAnswerDto,
    @Request() { user },
  ) {
    return this.formAnswersService.create(
      createFormAnswerDto,
      user as UserPayload,
    );
  }

  @Get('/by-user/:id')
  findOneByUser(@Param('id') id: string) {
    return this.formAnswersService.findOneByUser(id);
  }
}
