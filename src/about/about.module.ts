import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {About} from "./entities/about.entity";
import {AboutController} from "./about.controller";
import {AboutService} from "./about.service";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([About,User])],
  controllers: [AboutController],
  providers: [AboutService, ConfigService],
})
export class AboutModule {
}
