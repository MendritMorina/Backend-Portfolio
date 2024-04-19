import {BaseDto} from "../../base.dto";
import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateProjectDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  period?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;


  @IsString()
  @IsOptional()
  link?: string;

  @IsOptional()
  @IsString()
  personal?: string;

  @IsArray()
  technologies?: string[];
}
