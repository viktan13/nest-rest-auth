import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../users/users.schema";


export type RoleDocument = HydratedDocument<Role>



@Schema()
export class Role {

    _id: mongoose.Schema.Types.ObjectId;

    @Prop({type: String, unique: true, required: true})
    value: string;

    @Prop({type: String})
    description: string;

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'User'})
    users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
