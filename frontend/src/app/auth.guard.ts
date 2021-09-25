import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class userGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user=this.as.getUser()
        if(user.role=='user'){
            return true;
        }
        this.router.navigate(['/404'])
        return false;
        
    }
    constructor(private as:AuthService,private router:Router){}

}

@Injectable({ providedIn: 'root' })
export class doctorGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) {
        let user=this.as.getUser()
        if(user.role=='doctor'){

            return true;
        }
        this.router.navigate(['/404'])
        return false;
    }
    constructor(private as:AuthService,private router:Router) {}
}

@Injectable({ providedIn: 'root' })
export class adminGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user=this.as.getUser()
        if(user.role=='admin'){
            return true;
        }
        this.router.navigate(['/404'])
        return false;
    }
    constructor(private as:AuthService,private router:Router){}
}