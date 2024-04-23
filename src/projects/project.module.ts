import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Project} from "./entities/project.entity";
import {ProjectController} from "./project.controller";
import {ProjectService} from "./project.service";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/entities/user.entity";
import {ErrorLogService} from "../errors/error.service";
import {ErrorLog} from "../errors/entities/error.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Project,User,ErrorLog])],
  controllers: [ProjectController],
  providers: [ProjectService,ConfigService,ErrorLogService],
})
export class ProjectModule {}
