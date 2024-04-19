import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {BaseDto} from "../../base.dto";

export class SendEmailDto extends BaseDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string
}
