import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Role} from "../roles/roles.schema";
import {Post} from "../posts/posts.schema";


export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    _id: mongoose.Schema.Types.ObjectId;

    @Prop({type: String, unique: true, required: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: Boolean, default: false})
    banned: boolean;

    @Prop({type: String})
    banReason: string;

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Role', required: true})
    roles: Role[];

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Post'})
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
