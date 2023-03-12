import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.schema";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);

    }

    async register(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('The user with this email already exists', HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashedPassword});

        return this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user._id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);

        if(!user) {
            throw new UnauthorizedException({message: 'The email is not correct'});
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(!passwordEquals) {
            throw new UnauthorizedException({message: 'The password is incorrect'})
        }
        return user;
    }
}
