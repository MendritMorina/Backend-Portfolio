import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import {IntroService} from "./intro.service";
import {Intro} from "./entities/intro.entity";
import {CreateIntroDto} from "./dtos/create-intro.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileFilterConfig, storageConfig} from "../multer";
import {AuthGuard} from "../guards/auth.guard";


@Controller('intros')
export class IntroController {
  constructor(private readonly introService: IntroService) {
  }

  @Get()
  async find(): Promise<Intro> {
    return this.introService.find();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('pdfUrl', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() createIntroDto: CreateIntroDto): Promise<Intro> {
    return this.introService.upsertIntro(file, createIntroDto);
  }
}
