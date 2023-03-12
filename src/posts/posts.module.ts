import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./posts.schema";
import {User, UserSchema} from "../users/users.schema";
import {FilesModule} from "../files/files.module";


@Module({
  imports: [
      MongooseModule.forFeature(
          [
            {name: Post.name, schema: PostSchema},
            {name: User.name, schema: UserSchema}
          ]
      ),
      FilesModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
