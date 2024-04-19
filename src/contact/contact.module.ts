import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactService} from "./contact.service";
import {ContactController} from "./contact.controller";
import {ConfigService} from "@nestjs/config";
import {Contact} from "./entities/contact.entity";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  controllers: [ContactController],
  providers: [ContactService, ConfigService],
})
export class ContactModule {
}
