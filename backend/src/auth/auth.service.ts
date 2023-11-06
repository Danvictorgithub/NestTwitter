import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private UserService:UserService){}
    async validateUser(username:string, password:string):Promise<any> {
        const user = await this.UserService.findOneByUsername(username);
        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
