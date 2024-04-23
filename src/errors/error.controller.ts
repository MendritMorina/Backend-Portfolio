import {
    Controller,
    Get, HttpCode, HttpException, HttpStatus, Param, Query,
} from '@nestjs/common';
import {FilterErrorLogDto} from "./dtos/filter-error.dto";
import {ErrorLogService} from "./error.service";


@Controller('errors')
export class ErrorLogController {
    constructor(private readonly errorLogService: ErrorLogService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async find(@Query() filterErrorLogDto: FilterErrorLogDto) {
        console.log(filterErrorLogDto);
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
