import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {UserController} from "./user.controller";
import {ConfigService} from "@nestjs/config";
import {ErrorLogService} from "../errors/error.service";
import {ErrorLog} from "../errors/entities/error.entity";


@Module({
  imports: [TypeOrmModule.forFeature([User,ErrorLog])],
  controllers: [UserController],
  providers: [ConfigService,ErrorLogService],
})
export class UserModule {}
