import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from './users.schema';
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private rolesService: RolesService) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const createUser = new this.userModel(dto);
        const role = await this.rolesService.getRoleByValue('USER');
        await createUser.$set('roles', [role._id]);
        await createUser.save();
        return this.userModel.findOne({email: dto.email}).populate('roles');
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().populate('roles').exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).populate('roles').exec();
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findById(dto.userId).populate('roles').exec();
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (user && role) {
            user.roles.push(role);
            await user.save();
            return dto
        }
        throw new HttpException('The user or the role is not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userModel.findById(dto.userId);
        if(!user) {
            throw new HttpException('The user wasn\'t found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
