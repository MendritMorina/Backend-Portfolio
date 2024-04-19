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
import {Project} from "./entities/project.entity";
import {UpdateProjectDto} from "./dtos/update-project.dto";
import {CreateProjectDto} from "./dtos/create-project.dto";
import {ProjectService} from "./project.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileFilterConfig, storageConfig} from "../multer";
import {AuthGuard} from "../guards/auth.guard";

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @Get()
  async find(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(file, createProjectDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  async update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectService.update(file, id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.projectService.delete(id);
  }
}
