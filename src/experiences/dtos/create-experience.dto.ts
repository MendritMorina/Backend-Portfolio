import {BaseDto} from "../../base.dto";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateExperienceDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  period?: string;

  @IsString()
  @IsNotEmpty()
  company?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
