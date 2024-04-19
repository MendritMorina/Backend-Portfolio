import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Project} from "./entities/project.entity";
import {ProjectController} from "./project.controller";
import {ProjectService} from "./project.service";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/entities/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Project,User])],
  controllers: [ProjectController],
  providers: [ProjectService,ConfigService],
})
export class ProjectModule {}
