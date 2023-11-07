import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken"
import { JwtService } from 'src/jwt/jwt.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];
    let obj:any = this.jwtService.decode(token);
    // Checks if the token is Admin
    if (obj.isAdmin) 
      return true;
    else 
      return false;
  }
}
