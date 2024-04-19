import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {join} from "path";
import {dataSourceOptions} from "../db/data-source";
import {ServeStaticModule} from "@nestjs/serve-static";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'public'),
            serveRoot: '/public',
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
