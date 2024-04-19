import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExperienceController} from "./experience.controller";
import {ExperienceService} from "./experience.service";
import {Experience} from "./entities/experience.entity";
import {User} from "../users/entities/user.entity";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Experience,User])],
  controllers: [ExperienceController],
  providers: [ExperienceService,ConfigService],
})
export class ExperienceModule {
}
