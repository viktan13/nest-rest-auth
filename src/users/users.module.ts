import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./users.schema";
import {Role, RoleSchema} from "../roles/roles.schema";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {PostsModule} from "../posts/posts.module";
import {Post, PostSchema} from "../posts/posts.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema},
        {name: Role.name, schema: RoleSchema},
        {name: Post.name, schema: PostSchema},
    ]),
        RolesModule,
        PostsModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
