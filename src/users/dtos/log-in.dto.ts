import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {BaseDto} from "../../base.dto";

export class LogInDto extends BaseDto {
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
