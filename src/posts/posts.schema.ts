import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {User} from "../users/users.schema";


export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {

    _id: mongoose.Schema.Types.ObjectId;

    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    content: string;

    @Prop({type: String})
    image: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
