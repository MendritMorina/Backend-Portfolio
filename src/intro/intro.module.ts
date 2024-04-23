import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IntroController} from "./intro.controller";
import {IntroService} from "./intro.service";
import {Intro} from "./entities/intro.entity";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/entities/user.entity";
import {ErrorLogService} from "../errors/error.service";
import {ErrorLog} from "../errors/entities/error.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Intro, User,ErrorLog])],
    controllers: [IntroController],
    providers: [IntroService, ConfigService,ErrorLogService],
})
export class IntroModule {
}
