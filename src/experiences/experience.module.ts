import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExperienceController} from "./experience.controller";
import {ExperienceService} from "./experience.service";
import {Experience} from "./entities/experience.entity";
import {User} from "../users/entities/user.entity";
import {ConfigService} from "@nestjs/config";
import {ErrorLogService} from "../errors/error.service";
import {ErrorLog} from "../errors/entities/error.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Experience, User,ErrorLog])],
    controllers: [ExperienceController],
    providers: [ExperienceService, ConfigService,ErrorLogService],
})
export class ExperienceModule {
}
