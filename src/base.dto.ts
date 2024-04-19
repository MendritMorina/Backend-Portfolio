import {IsDate, IsOptional, IsString} from "class-validator";

export class BaseDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
