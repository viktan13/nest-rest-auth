import {IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Should be a string'})
    readonly userId: string;
    @IsString({message: 'Should be a string'})
    readonly value: string;
}
