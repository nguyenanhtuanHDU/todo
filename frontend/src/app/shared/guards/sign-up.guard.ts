import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignUpComponent } from 'src/app/components/auth/sign-up/sign-up.component';

@Injectable()
export class signUpGuard implements CanDeactivate<SignUpComponent>{
  canDeactivate(component: SignUpComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canExit()
  }
}
