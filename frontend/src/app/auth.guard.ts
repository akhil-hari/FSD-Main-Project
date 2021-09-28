import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { DoctorService } from './doctor.service';

@Injectable({ providedIn: 'root' })
export class userGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user=this.as.getUser()
        if(user.role=='user'){
            if(route.url[0].path=='bookappointment'){
                this.ds.doctorFromId(route.url[1].path||'').subscribe((data:any) =>{
                    if(data.type&&data.type=='err') this.router.navigate(['/404']);

                })


            }
            return true;
        }
        this.router.navigate(['/404']);
        return false;
        
    }
    constructor(private as:AuthService,private router:Router,private ds:DoctorService){}

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

@Injectable({ providedIn: 'root' })
export class commonGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(route.url[0].path=='doctor'){
            this.ds.doctorFromId(route.url[1].path||'').subscribe((data:any) =>{
                console.log(data);
                if(data.type=='err') this.router.navigate(['/404']);

            })


        }
        else if(route.url[0].path=='hospital'){
            this.ds.getHospital(route.url[1].path||'').subscribe((data:any) =>{
                if(data.type&&data.type=='err') this.router.navigate(['/404']);

            })
        }
        
        // this.router.navigate(['/404'])
        return true;
    }
    constructor(private as:AuthService,private router:Router,private ds:DoctorService){}
}