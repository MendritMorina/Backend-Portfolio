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
    UseGuards, HttpCode, HttpStatus, HttpException
} from '@nestjs/common';
import {Project} from "./entities/project.entity";
import {UpdateProjectDto} from "./dtos/update-project.dto";
import {CreateProjectDto} from "./dtos/create-project.dto";
import {ProjectService} from "./project.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileFilterConfig, storageConfig} from "../multer";
import {AuthGuard} from "../guards/auth.guard";
import {ErrorLogService} from "../errors/error.service";

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService, private readonly errorLogService: ErrorLogService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async find(): Promise<Project[]> {
        try {
            return await this.projectService.findAll();
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ProjectController',
                body: err,
                method: 'GET',
                createdAt: new Date()
            })
            throw new HttpException('NotFound', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('imageUrl', {
            storage: storageConfig(),
            fileFilter: fileFilterConfig,
        }),
    )
    async create(@UploadedFile() file: Express.Multer.File, @Body() createProjectDto: CreateProjectDto): Promise<Project> {
        try {
            return await this.projectService.create(file, createProjectDto);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ProjectController',
                body: err,
                method: 'POST',
                createdAt: new Date()
            })
            throw new HttpException('NotCreated', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('imageUrl', {
            storage: storageConfig(),
            fileFilter: fileFilterConfig,
        }),
    )
    async update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
        try {
            return await this.projectService.update(file, id, updateProjectDto);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ProjectController',
                body: err,
                method: 'PUT',
                createdAt: new Date()
            })
            throw new HttpException('NotUpdated', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return await this.projectService.delete(id);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ProjectController',
                body: err,
                method: 'DELETE',
                createdAt: new Date()
            })
            throw new HttpException('NotDeleted', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
