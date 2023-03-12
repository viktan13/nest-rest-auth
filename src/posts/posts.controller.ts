import {Controller, UploadedFile, Body, Post, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postsService.createPost(dto, image);
    }
}
