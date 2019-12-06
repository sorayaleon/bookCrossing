import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SesionIniciadaService implements CanActivate {

  // canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): 
  //   boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | 
  //   Promise<boolean | import("@angular/router").UrlTree> {
  //     throw new Error("Method not implemented.");
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    return this.token.loggedIn();
  }

  constructor(
    private token: TokenService
  ) { }
}
