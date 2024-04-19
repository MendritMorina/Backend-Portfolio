import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IntroController} from "./intro.controller";
import {IntroService} from "./intro.service";
import {Intro} from "./entities/intro.entity";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Intro,User])],
  controllers: [IntroController],
  providers: [IntroService, ConfigService],
})
export class IntroModule {
}
