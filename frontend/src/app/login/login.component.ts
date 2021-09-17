import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';

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

  constructor() { }
  acnt_type:string = 'nu';
  toggle_acnt_type(s:string) : void {
    this.acnt_type=s;
  }

  onLogin():void{
    console.log(this.loginForm.valid);
    let login={
      role:this.acnt_type=='doc'?'doctor':'user',
      email:this.loginForm.value.email,
      password:this.loginForm.value.password,

    }
    console.log(this.loginForm);
  }
  ngOnInit(): void {
  }

}
