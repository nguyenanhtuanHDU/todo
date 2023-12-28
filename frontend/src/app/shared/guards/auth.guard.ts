import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';



// export const authGuard: CanActivateFn = (route, state) => {
//   cons
//   return true;
// };


@Injectable()
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken()
    if (!token) this.route.navigate(['sign-in'])
    return !!token
  }
}
