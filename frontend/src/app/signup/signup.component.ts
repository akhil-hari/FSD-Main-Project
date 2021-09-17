import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('imgInput') imgInput!: ElementRef;

  acnt_type: string = 'nu';
  toggle_acnt_type(s: string): void {
    this.acnt_type = s;
  }

  uploadImg(): void {
    (this.imgInput.nativeElement).click()

  }


  constructor() { }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    console.log(this.imgInput);
    
    this.imgInput.nativeElement.onchange = (e: any) => {
      let files = this.imgInput.nativeElement.files;
  
    }

  }

}
