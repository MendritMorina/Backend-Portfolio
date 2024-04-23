import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ErrorLog} from "./entities/error.entity";
import {ErrorLogController} from "./error.controller";
import {ErrorLogService} from "./error.service";

@Module({
    imports: [TypeOrmModule.forFeature([ErrorLog])],
    controllers: [ErrorLogController],
    providers: [ErrorLogService],
})
export class ErrorLogModule {
}
