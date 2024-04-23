import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import {ExperienceService} from "./experience.service";
import {Experience} from "./entities/experience.entity";
import {CreateExperienceDto} from "./dtos/create-experience.dto";
import {UpdateExperienceDto} from "./dtos/update-experience.dto";
import {AuthGuard} from "../guards/auth.guard";
import {ErrorLogService} from "../errors/error.service";

@Controller('experiences')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService, private readonly errorLogService: ErrorLogService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async find(): Promise<Experience[]> {
        try {
            return await this.experienceService.findAll();
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ExperienceController',
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
    async create(@Body() createExperienceDto: CreateExperienceDto): Promise<Experience> {
        try {
            return await this.experienceService.create(createExperienceDto);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ExperienceController',
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
    async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
        try {
            return await this.experienceService.update(id, updateExperienceDto);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ExperienceController',
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
            return await this.experienceService.delete(id);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ExperienceController',
                body: err,
                method: 'DELETE',
                createdAt: new Date()
            })
            throw new HttpException('NotDeleted', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
