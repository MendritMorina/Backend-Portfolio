import {IsDate, IsDateString, IsOptional,} from 'class-validator';

export class FilterErrorLogDto{
    @IsOptional()
    @IsDateString()
    fromDate?: Date;

    @IsOptional()
    @IsDateString()
    toDate?: Date;
}