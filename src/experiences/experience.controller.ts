import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards} from '@nestjs/common';
import {ExperienceService} from "./experience.service";
import {Experience} from "./entities/experience.entity";
import {CreateExperienceDto} from "./dtos/create-experience.dto";
import {UpdateExperienceDto} from "./dtos/update-experience.dto";
import {AuthGuard} from "../guards/auth.guard";

@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {
  }

  @Get()
  async find(): Promise<Experience[]> {
    return this.experienceService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createExperienceDto: CreateExperienceDto): Promise<Experience> {
    return this.experienceService.create(createExperienceDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    return this.experienceService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.experienceService.delete(id);
  }
}
