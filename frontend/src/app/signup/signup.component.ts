import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl,ValidationErrors, ValidatorFn} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import { DoctorService } from '../doctor.service';
import {FirebaseUploadService} from '../firebase-upload.service'
import { NotifictionService } from '../notifiction.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('imgInput') imgInput!: ElementRef;
  @ViewChild('dp') datePicker!: MatDatepicker<Date>;
passwordMatch:boolean = false;
experience:Date=new Date();
imgUrl:string='';
options:Array<any>=[];
  // matchPassword(control: AbstractControl) {
 
  //   const password = control.get("password")?.value;
  //   const confirm = control.get("confirm")?.value;
  
  
  //   if (password != confirm) { return { 'noMatch': true } }
  
  //   return null
  
  // }

  commonForm:FormGroup=new FormGroup({
    phone:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required])


  })

  userForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required]),
    sex:new FormControl('',[Validators.required])
  });
  doctorForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    speciality:new FormControl('',[Validators.required]),
    currentHospital:new FormControl('',[Validators.required]),
    // experience:new FormControl('',[Validators.required])
  })

  

  acnt_type: string = 'nu';
  passwordValid: boolean=true;
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
    this.experience=new Date(this.date.year,this.date.month,1);
    console.log(this.experience);
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


  constructor(private fs:FirebaseUploadService,private ds:DoctorService,private ns:NotifictionService) { }

  ngOnInit(): void {
    this.doctorForm.get('currentHospital')?.valueChanges.subscribe(q=>{
      this.ds.searchHospital(q).subscribe((data:any)=>{
        this.options=data||[];

      });

    });
    this.commonForm.get('confirmPassword')?.valueChanges.subscribe(x=>{
      let y=this.commonForm.get('password')?.value;
      if(x!=y){
       
        this.passwordMatch=false;

      }
      else{
        this.passwordMatch=true;
      }
    })

    this.commonForm.get('password')?.valueChanges.subscribe(x=>{
      let y=this.commonForm.get('confirmPassword')?.value;
     
      
      if(x.length<8){
        
        this.passwordValid=false;
      }
      else{
        this.passwordValid=true;

      }
      if(x!=y){
     
        this.passwordMatch=false;

      }
      else{
        this.passwordMatch=true;
      }
    })

  }
   signUp(){
     console.log('poo')
     console.log(this.commonForm.valid);
     console.log(this.doctorForm.valid);
     console.log(this.userForm.valid);
     let cform=this.commonForm.value;
     let data;
     if(this.acnt_type=='doc'){
       let form=this.doctorForm.value;
       data={
        name:form.name,
        role:'doctor',
        speciality:form.speciality,
        currentHospital:form.currentHospital,
        experience:this.experience,
        phone:cform.phone,
        email:cform.email,
        password:cform.password,
        image:this.imgUrl,

       }

     }
     else if(this.acnt_type=='nu'){
       let form=this.userForm.value;
       data={
        name:form.name,
        role:'user',
        age:form.age,
        sex:form.sex,
        phone:cform.phone,
        email:cform.email,
        password:cform.password,
        image:this.imgUrl,

       }
       
     }
     console.log(data);
     if(data)this.ds.signUp(data).subscribe(x=>{
       console.log(x);
       this.ns.notify(x);

     })

   }


  ngAfterViewInit(): void {
    console.log(this.imgInput);
    
    this.imgInput.nativeElement.onchange = (e: any) => {

      this.fs.deleteFile(this.imgUrl);
      this.fs.uploadFile(e);
      this.fs.uploadUrlAvailable.subscribe({
        next:(url)=>{
          this.imgUrl=url;
          console.log(this.imgUrl);

        }
      })
      
  
    }



  }

}
