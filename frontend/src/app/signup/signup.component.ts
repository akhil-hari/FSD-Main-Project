import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl,ValidationErrors, ValidatorFn} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('imgInput') imgInput!: ElementRef;
  @ViewChild('dp') datePicker!: MatDatepicker<Date>;
passwordMatch:boolean = true;
  // matchPassword(control: AbstractControl) {
 
  //   const password = control.get("password")?.value;
  //   const confirm = control.get("confirm")?.value;
  
  
  //   if (password != confirm) { return { 'noMatch': true } }
  
  //   return null
  
  // }

  commonForm:FormGroup=new FormGroup({
    phone:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required])


  })

  

  acnt_type: string = 'nu';
  toggle_acnt_type(s: string): void {
    this.acnt_type = s;
  }
  expValue:string='';
  date:any={year:0,month:0};
  chosenYearHandler(year:Date){
    // console.log(year);
    this.date.year=year.getFullYear();

    

  }
  chosenMonthHandler(month:Date,datepicker: MatDatepicker<Date>){
    this.date.month=month.getMonth();
    this.expValue=`${this.date.month+1}/${this.date.year}`;
    datepicker.close();

  }

  pastFilter = (d: Date|null): boolean => {
    const dateToday = new Date();
    const year=(d||dateToday).getFullYear();
    const month=(d||dateToday).getFullYear();
    // Prevent Saturday and Sunday from being selected.//
    // return ( dateToday.getFullYear()>year || (dateToday.getFullYear()==year && dateToday.getMonth() <month));
    return (dateToday>=(d||dateToday))
  }

  uploadImg(): void {
    (this.imgInput.nativeElement).click()

  }
  dateIpClick(){
    (this.datePicker).open();
  }


  constructor() { }

  ngOnInit(): void {
    this.commonForm.get('confirmPassword')?.valueChanges.subscribe(x=>{
      let y=this.commonForm.get('password')?.value;
      if(x!=y){
        this.passwordMatch=false;

      }
      else{
        this.passwordMatch=true;
      }
    })

  }


  ngAfterViewInit(): void {
    console.log(this.imgInput);
    
    this.imgInput.nativeElement.onchange = (e: any) => {
      let files = this.imgInput.nativeElement.files;
  
    }

  }

}
