import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
@Injectable()
export class JwtService {
    decode(token:string) {
        try {
            return jwt.verify(token,process.env.JWT_SECRET); 
        } catch (error) { 
            throw new UnauthorizedException("Invalid token"); 
        }
    }
}
