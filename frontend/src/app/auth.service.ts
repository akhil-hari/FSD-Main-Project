import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
// import { throwIfEmpty } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authBroadcast:Subject<any>=new Subject<any>();
  

  constructor(private http: HttpClient) {
    if(localStorage.getItem('auth')&&localStorage.getItem('profile')&&localStorage.getItem('role')){
      let authString=localStorage.getItem('auth')
      this.tokens=authString&&JSON.parse(authString);
      this.user.profile=localStorage.getItem('profile');
      this.user.role=localStorage.getItem('role');
      this.loggedIn=true;

    }
   }
  baseUrl=environment.baseUrl;
  user:any={profile:'',role:''};
  private loggedIn:boolean=false;
  private tokens={accessToken:'',refreshToken:''};

  private setAuth(data:any){
    console.log(data);

    localStorage.setItem('auth',JSON.stringify({refreshToken:data.refreshToken,accessToken:data.accessToken}));
    localStorage.setItem('role',data.role);
    localStorage.setItem('profile',data.profile);
    this.user.profile=data.profile;
    this.user.role=data.role;
    this.tokens={refreshToken:data.refreshToken,accessToken:data.accessToken};



  }

  login(item:any){
    let output=500;
    this.authBroadcast.next({user:this.user,result:output});
    this.http.post(this.baseUrl+'auth/login',item).subscribe((data:any)=>{
      console.log('poo');
      if(data){

        this.setAuth(data);
        this.loggedIn=true;
        output=202;
        this.authBroadcast.next({user:this.user,result:output});
        // console.log(output);
      }
      
      
    },
    (err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status==401){
          output=401;
          this.authBroadcast.next({user:this.user,result:output});
        }
      }
    });
    // console.log(output);
    return output;
    

  }
  logout(){
    this.loggedIn=false;
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    localStorage.removeItem('profile');
    this.user={profile:'',role:''};

  }
  isLoggedIn(){
      return this.loggedIn;

  }
  getAccessToken(){
    if(this.loggedIn){
      return this.tokens.accessToken;

    }
    else{
      return '';
    }
  }
  reactivateTokens(){
    if(this.loggedIn){
      this.http.post(this.baseUrl+'auth/refresh',{token:this.tokens.refreshToken}).subscribe((data:any)=>{
        this.setAuth(data);

      })
    }
      

  }

}
