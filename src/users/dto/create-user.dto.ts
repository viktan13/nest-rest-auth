import {IsEmail, IsString, Length} from 'class-validator';

export class CreateUserDto {
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: 'Not correct email string'})
    readonly email: string;
    @IsString({message: 'Should be a string'})
    @Length(4, 16, {message: 'Should be from 4 to 16 characters'})
    readonly password: string;
}
