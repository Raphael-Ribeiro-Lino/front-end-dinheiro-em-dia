import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const tokenData: any = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenData.exp && tokenData.exp > currentTime) {
        return true;
      } else {
        console.log('Token expirado');
        return inject(Router).createUrlTree(["/", "login"])
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return inject(Router).createUrlTree(["/", "login"])
    }
  } else {
    return inject(Router).createUrlTree(["/", "login"]);
  }

};
