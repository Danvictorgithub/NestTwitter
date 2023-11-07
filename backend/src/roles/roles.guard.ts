import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken"
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];
    let obj:any
    try { 
      obj = jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException("Invalid token"); 
    }
    // Checks if the token is Admin
    if (obj.isAdmin) 
      return true;
    else 
      return false;
  }
}
