import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import * as process from "process";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule
    ]
})
export class AppModule {
}
