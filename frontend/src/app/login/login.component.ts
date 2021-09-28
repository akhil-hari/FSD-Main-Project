import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  constructor(private as:AuthService,private router:Router) { }
  acnt_type:string = 'nu';
  toggle_acnt_type(s:string) : void {
    this.acnt_type=s;

  }
  loginMsg:string='';

  
  onLogin():void{
    
    let login={
      role:this.acnt_type=='doc'?'doctor':'user',
      email:this.loginForm.value.email,
      password:this.loginForm.value.password,

    }
    this.as.login(login);
    this.as.authBroadcast.subscribe(b=>{
      let loginResult=b.result;

      if(loginResult==500){
        this.loginMsg="Can't reach server";
  
      }
      else if(loginResult==401){
      this.loginMsg="Email or Password is incorrect";
      }
      else{
        this.loginMsg='';
        // this.router.navigate(['/']);
        this.loginAction();
       
      }
     
    })
    
    
    // console.log(this.loginForm);

  }
private loginAction(){
  if(this.as.isLoggedIn()){
    let u=this.as.getUser();
    if(u.role=='user'){
      this.router.navigate(['/profile/user']);
    }
    else if (u.role=='doctor'){
      this.router.navigate(['/profile/doctor']);

    }
    else if(u.role=='admin'){

    }
  }

}
  
  ngOnInit(): void {
    this.loginAction();

  }

}
