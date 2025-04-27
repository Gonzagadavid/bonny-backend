import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/auth.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.VOLUNTEER)
  create(@Body() createFormDto: CreateFormDto, @Request() { user }) {
    return this.formsService.create(createFormDto, user as UserPayload);
  }

  @Post('/active-form/:id')
  activeForm(@Param('id') id: string) {
    return this.formsService.activeForm(id);
  }

  @Get('/active-form')
  findActiveForm() {
    return this.formsService.findActiveForm();
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
