import {IsNotEmpty, IsOptional, IsString,} from 'class-validator';
import {BaseDto} from "../../base.dto";

export class CreateIntroDto extends BaseDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;
}
