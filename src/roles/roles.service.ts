import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Role} from "./roles.schema";
import {Model} from "mongoose";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const createRole = new this.roleModel(dto);
        return createRole.save();
    }

    async getRoleByValue(value: string): Promise<Role> {
        return this.roleModel.findOne({value})
    }
}
