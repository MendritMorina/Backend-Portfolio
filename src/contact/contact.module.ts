import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactService} from "./contact.service";
import {ContactController} from "./contact.controller";
import {ConfigService} from "@nestjs/config";
import {Contact} from "./entities/contact.entity";
import {User} from "../users/entities/user.entity";
import {ErrorLogService} from "../errors/error.service";
import {ErrorLog} from "../errors/entities/error.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Contact, User,ErrorLog])],
    controllers: [ContactController],
    providers: [ContactService, ConfigService,ErrorLogService],
})
export class ContactModule {
}
