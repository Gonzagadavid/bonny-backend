import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FormAnswersService } from './form-answers.service';
import { CreateFormAnswerDto } from './dto/create-form-answer.dto';
import { UpdateFormAnswerDto } from './dto/update-form-answer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@users/schemas/user.schema';
import { UserPayload } from 'src/auth/auth.service';

@Controller('form-answers')
export class FormAnswersController {
  constructor(private readonly formAnswersService: FormAnswersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.VOLUNTEER)
  create(
    @Body() createFormAnswerDto: CreateFormAnswerDto,
    @Request() { user },
  ) {
    return this.formAnswersService.create(
      createFormAnswerDto,
      user as UserPayload,
    );
  }

  @Get()
  findAll() {
    return this.formAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formAnswersService.findOne(+id);
  }

  @Get('/by-user/:id')
  findOneByUser(@Param('id') id: string) {
    return this.formAnswersService.findOneByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormAnswerDto: UpdateFormAnswerDto,
  ) {
    return this.formAnswersService.update(+id, updateFormAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formAnswersService.remove(+id);
  }
}
