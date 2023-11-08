import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(private UserService:UserService, private jwtService:JwtService){}
    // Authenticates Username and Password
    async validateUser(username:string, password:string):Promise<any> {
        const user = await this.UserService.findOneByUsername(username);
        const result = (user) ? bcrypt.compareSync(password, user.password): false;
        if (user && result) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    // Returns JWT Bearer Token
    async login(user:any) {
        const payload = {username: user.username, id: user.id,isAdmin: user.isAdmin,name:user.name,userProfile:user.userProfile};
        return {
            // Calls Passport JWTStrategy
            access_token: this.jwtService.sign(payload)
        }
    }
}
