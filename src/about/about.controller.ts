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
import {AboutService} from "./about.service";
import {About} from "./entities/about.entity";
import {CreateAboutDto} from "./dtos/create-about.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileFilterConfig, storageConfig} from "../multer";
import {AuthGuard} from "../guards/auth.guard";


@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {
  }

  @Get()
  async find(): Promise<About> {
    return this.aboutService.find();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  async upsertAbout(@UploadedFile() file: Express.Multer.File, @Body() createAboutDto: CreateAboutDto): Promise<About> {
    return this.aboutService.upsertAbout(file, createAboutDto);
  }
}
