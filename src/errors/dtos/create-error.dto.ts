import {IsOptional, IsString,} from 'class-validator';
import {BaseDto} from "../../base.dto";

export class CreateErrorLogDto extends BaseDto{
    @IsString()
    @IsOptional()
    controllerName: string;

    @IsString()
    @IsOptional()
    body: string;

    @IsString()
    @IsOptional()
    method: string;
}
