import {
    Controller,
    Get,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    UseGuards, HttpException, HttpStatus, HttpCode
} from '@nestjs/common';
import {AboutService} from "./about.service";
import {About} from "./entities/about.entity";
import {CreateAboutDto} from "./dtos/create-about.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileFilterConfig, storageConfig} from "../multer";
import {AuthGuard} from "../guards/auth.guard";
import {ErrorLogService} from "../errors/error.service";


@Controller('about')
export class AboutController {
    constructor(private readonly aboutService: AboutService, private readonly errorLogService: ErrorLogService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async find(): Promise<About> {
        try {
            return this.aboutService.find();
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'AboutController',
                body: err,
                method: 'GET',
                createdAt: new Date()
            })
            throw new HttpException('NotFound', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(
        FileInterceptor('imageUrl', {
            storage: storageConfig(),
            fileFilter: fileFilterConfig,
        }),
    )
    async upsertAbout(@UploadedFile() file: Express.Multer.File, @Body() createAboutDto: CreateAboutDto): Promise<About> {
        try {
            return this.aboutService.upsertAbout(file, createAboutDto);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'AboutController',
                body: err,
                method: 'POST',
                createdAt: new Date()
            })
            throw new HttpException('NotCreated', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
