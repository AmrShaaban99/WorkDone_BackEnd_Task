import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return false;

      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}