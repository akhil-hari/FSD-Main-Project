import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  acnt_type:string = 'nu';
  toggle_acnt_type(s:string) : void {
    this.acnt_type=s;
  }
  ngOnInit(): void {
  }

}
