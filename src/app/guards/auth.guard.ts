import { UserAuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: UserAuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      // método onAuthStateChanged() detectar mudanças no usuário
      this.authService.getAuth().onAuthStateChanged(user => {
        if(!user) this.router.navigate(['login'])
        resolve(user ? true : false)
      })
    })
  }

}
