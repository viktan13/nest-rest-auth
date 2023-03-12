import {Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Post} from "./posts.schema";
import {Model} from "mongoose";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post.name) private postModel: Model<Post>,
                private filesService: FilesService) {
    }

    async createPost(dto: CreatePostDto, image) {
        const filename = await this.filesService.createFile(image);
        const post = await this.postModel.create({...dto, image: filename});
        return post;
    }
}
