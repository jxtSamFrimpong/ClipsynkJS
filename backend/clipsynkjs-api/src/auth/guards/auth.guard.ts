import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { UsersService } from 'src/users/users.service';
import { appconfig } from '../../utils/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';



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


@Injectable()
export class PasswordResetAuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
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
      const secretKey = appconfig.auth.jwtSecret;
      if (!secretKey) {
        throw new Error('JWT_SECRET environment variable is not set');
      }
      const decoded = jwt.verify(token, secretKey as Secret) as JwtPayload;
      if (!decoded) {
        return false;
      }
      // request.user = decoded; // Attach decoded token to request for later use
      // return true;
      //decoded token should have password_reset as its scope and passwordhash slice -10 should match with what the user(found using user service) has as passwordHash
      const user = await this.userService.getOne(decoded.user)
      if (!user){
        return false;
      }
      if (decoded.scope !== 'password_reset'){
        return false;
      }
      if (user.passwordHash.slice(-10) !== decoded.version){
        return false;
      }
      return true;

    } catch (error) {
      console.error('Error in AuthGuard:', error);
      return false;
    }
  }
}
