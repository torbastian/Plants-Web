import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AccountService } from "../services/account.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        
        //Logged in
        if (user) {
            return true;
        }

        //Not logged in
        this.router.navigate(['/Account/Login'], { queryParams: {returnUrl: state.url}});
        return false;
    }
}