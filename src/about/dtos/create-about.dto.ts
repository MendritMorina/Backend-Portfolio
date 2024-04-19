import {BaseDto} from "../../base.dto";
import {IsArray, IsOptional, IsString} from "class-validator";

export class CreateAboutDto extends BaseDto {
  @IsString()
  @IsOptional()
  descriptionOne?: string;

  @IsString()
  @IsOptional()
  descriptionTwo?: string;

  @IsArray()
  @IsOptional()
  skills: string[];
}
