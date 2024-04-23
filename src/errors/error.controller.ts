import {
    Controller,
    Get, HttpCode, HttpException, HttpStatus, Param, Query, UseGuards,
} from '@nestjs/common';
import {FilterErrorLogDto} from "./dtos/filter-error.dto";
import {ErrorLogService} from "./error.service";
import {AuthGuard} from "../guards/auth.guard";


@Controller('errors')
export class ErrorLogController {
    constructor(private readonly errorLogService: ErrorLogService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async find(@Query() filterErrorLogDto: FilterErrorLogDto) {
        try {
            return await this.errorLogService.getErrors(filterErrorLogDto);
        } catch (err) {
            await this.errorLogService.saveError({
                controllerName: 'ErrorLogController',
                body: err,
                method: 'GET',
                createdAt: new Date()
            })
            throw new HttpException('NotFound', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
