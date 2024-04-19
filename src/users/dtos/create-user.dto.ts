import {BaseDto} from "../../base.dto";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
