import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core/services/reflector.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //return true;
    try {

      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true; // Skip authentication for public routes
      }

      const skipAuth = this.reflector.getAllAndOverride<boolean>('skipAuth', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (skipAuth) {
        return true; // Skip authentication for routes marked with @SkipAuth
      }




      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
      if (!authHeader) {
        return false;
      }
      const token = authHeader.split(' ')[1];
      if (!token) {
        return false;
      }
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error('JWT_SECRET environment variable is not set');
      }
      const decoded = jwt.verify(token, secretKey as Secret) as JwtPayload;
      if (!decoded) {
        return false;
      }
      request.user = decoded; // Attach decoded token to request for later use
      return true;
    } catch (error) {
      console.error('Error in AuthGuard:', error);
      return false;
    }
  }
}
