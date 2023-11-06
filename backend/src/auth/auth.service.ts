import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcryptjs";
@Injectable()
export class AuthService {
    constructor(private UserService:UserService, private jwtService:JwtService){}
    async validateUser(username:string, password:string):Promise<any> {
        const user = await this.UserService.findOneByUsername(username);
        const result = bcrypt.compareSync(password, user.password);
        if (user && result) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    async login(user:any) {
        const payload = {name: user.name, id: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
