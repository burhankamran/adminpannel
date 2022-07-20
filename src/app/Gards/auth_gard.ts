import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { Injectable } from '@angular/core';
import { AuthService } from "../Services/Auth";

@Injectable(
    {
        providedIn:'root'
    }
)
export class AuthGard implements CanActivate{
    constructor(private auth:AuthService,private route:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const auth=this.auth.getUserAuth();
        if(!auth){
         this.route.navigate(['/login'])
        }
        return auth;
    }


}
