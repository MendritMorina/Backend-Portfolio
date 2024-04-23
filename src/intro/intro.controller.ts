import {
    Controller,
    Get,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    UseGuards, HttpStatus, HttpCode, HttpException
} from '@nestjs/common';
import {IntroService} from "./intro.service";
import {Intro} from "./entities/intro.entity";
import {CreateIntroDto} from "./dtos/create-intro.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileFilterConfig, storageConfig} from "../multer";
import {AuthGuard} from "../guards/auth.guard";
import {ErrorLogService} from "../errors/error.service";


@Controller('intros')
export class IntroController {
    constructor(private readonly introService: IntroService, private readonly errorLogService: ErrorLogService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async find(): Promise<Intro> {
        try {
            return await this.introService.find();
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'IntroController',
                body: err,
                method: 'GET',
                createdAt: new Date()
            })
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('pdfUrl', {
            storage: storageConfig(),
            fileFilter: fileFilterConfig,
        }),
    )
    async create(@UploadedFile() file: Express.Multer.File, @Body() createIntroDto: CreateIntroDto): Promise<Intro> {
        try {
            return await this.introService.upsertIntro(file, createIntroDto);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'IntroController',
                body: err,
                method: 'GET',
                createdAt: new Date()
            })
            throw new HttpException('NotCreated', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
