import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {About} from "./entities/about.entity";
import {AboutController} from "./about.controller";
import {AboutService} from "./about.service";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/entities/user.entity";
import {ErrorLogService} from "../errors/error.service";
import {ErrorLog} from "../errors/entities/error.entity";

@Module({
    imports: [TypeOrmModule.forFeature([About, User,ErrorLog])],
    controllers: [AboutController],
    providers: [AboutService, ConfigService,ErrorLogService],
})
export class AboutModule {
}
