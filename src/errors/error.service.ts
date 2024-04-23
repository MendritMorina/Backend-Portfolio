import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
    Between,
    FindOperator,
    LessThan,
    MoreThanOrEqual,
    Repository,
} from 'typeorm';import {ErrorLog} from "./entities/error.entity";
import {FilterErrorLogDto} from "./dtos/filter-error.dto";
import {CreateErrorLogDto} from "./dtos/create-error.dto";

@Injectable()
export class ErrorLogService {
    constructor(
        @InjectRepository(ErrorLog)
        private readonly errorLogRepository: Repository<ErrorLog>,
    ) {
    }

    async getErrors(filterErrorLogDto:FilterErrorLogDto):Promise<ErrorLog[]>{
        type FindOption = {
            createdAt?: FindOperator<Date>;
        };
        const findOptions: FindOption = {};

        if (filterErrorLogDto.fromDate && filterErrorLogDto.toDate) {
            const start = new Date(filterErrorLogDto.fromDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(filterErrorLogDto.toDate);
            end.setHours(23, 59, 59, 999);
            findOptions.createdAt = Between(start, end);
        } else if (filterErrorLogDto.fromDate && !filterErrorLogDto.toDate) {
            const start = new Date(filterErrorLogDto.fromDate);
            start.setHours(0, 0, 0, 0);
            findOptions.createdAt = MoreThanOrEqual(start);
        } else if (!filterErrorLogDto.fromDate && filterErrorLogDto.toDate) {
            const end = new Date(filterErrorLogDto.toDate);
            end.setHours(23, 59, 59, 999);
            findOptions.createdAt = LessThan(end);
        }

        return await this.errorLogRepository.find({
            where: findOptions,
            order: { createdAt: 'DESC' },
        });
    }

    async saveError(createErrorLogDto:CreateErrorLogDto): Promise<ErrorLog> {
        const errorLog = new ErrorLog()
        errorLog.controllerName = createErrorLogDto.controllerName;
        errorLog.body = createErrorLogDto.body;
        errorLog.createdAt = createErrorLogDto.createdAt;
        errorLog.method = createErrorLogDto.method;
        return await this.errorLogRepository.save(errorLog);
    }
}
