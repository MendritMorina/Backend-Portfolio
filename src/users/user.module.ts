import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {UserController} from "./user.controller";
import {ConfigService} from "@nestjs/config";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [ConfigService],
})
export class UserModule {}
