import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {join} from "path";
import {dataSourceOptions} from "../db/data-source";
import {ServeStaticModule} from "@nestjs/serve-static";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";
import {IntroModule} from "./intro/intro.module";
import {AboutModule} from "./about/about.module";
import {ExperienceModule} from "./experiences/experience.module";
import {ProjectModule} from "./projects/project.module";
import {ContactModule} from "./contact/contact.module";
import {ErrorLogModule} from "./errors/error.module";

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'public'),
            serveRoot: '/public',
        }),
        UserModule,
        IntroModule,
        AboutModule,
        ExperienceModule,
        ProjectModule,
        ContactModule,
        ErrorLogModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
