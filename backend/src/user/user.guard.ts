import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) // roles của controller
    const request = context.switchToHttp().getRequest(); 
    console.log(roles.includes('admin'))
    return roles?.includes(request.headers.role) // check xem request có role thuộc roles không 
  }
}
