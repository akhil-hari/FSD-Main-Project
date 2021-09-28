import { Component, OnInit,AfterViewInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http'
import { NotifictionService } from '../notifiction.service';




@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, AfterViewInit{

  constructor(private ds:DoctorService,private route: ActivatedRoute,private router: Router,private as:AuthService,private ns:NotifictionService) { }
  doctor:any={};
  ratingObj:any={};
  rating:number=0;
  tab:string='home';
  editReview:boolean=false;
  reviews:Array<any>=[];
  doctor_id:string='';
  user:any={profile:'',role:''};
  userProfile:any;
  myReview:any={review:''};
  myTempRating:number=0;
  myTempReview:string='';
  reportMsg:boolean=false;
  reportBtn(){
    this.reportMsg=true;
    setTimeout(()=>{
      this.reportMsg=false;
    },15000);
  }
  setRating(n:number){
    this.myTempRating=n/20;

  }
  saveBtn(){
    console.log(this.myTempRating);
    console.log(this.myTempReview);
    if(this.user.role=='user'){
      
      this.ds.setReview(this.doctor_id,this.user.profile,this.myTempRating||0,this.myTempReview).subscribe((data:any)=>{
        this.myTempRating=data.rating;
        this.myTempReview=data.review;
        this.myReview={review:data.review,updated:data.updated,rating:data.rating};
        this.toggleEdit(false);
        this.ngAfterViewInit(2);
        this.ns.notify({type:'success',msg:'Review Updated'})

        console.log(data);
      })

    }
    
  }
cancelBtn(){
  this.myTempReview=this.myReview.review;
  this.myTempRating=this.myReview.rating||0;
  this.toggleEdit(false);

}
  // x:any=undefined;
  toggleEdit(state:boolean):void{
    
    this.editReview=state;
 

  }

  bookAppointment(){
    this.router.navigate(['/bookappointment/'+this.doctor_id])

  }
  experienceCalc(exp:string){
    let e=new Date(exp)
    let d= new Date()
    let em=e.getMonth();
    let dm=d.getMonth();
    let ey=e.getFullYear();
    let dy=d.getFullYear();
    // let month=11;
    let mstr='';
    let ystr='';
    let year=0;
    if(dm>em){
      year=dy-ey;
    }
    else{
      year=dy-ey-1;
    }

    ystr=year<=0?'':(year+' Year(s) ');
    if((em-dm)==0){
      mstr='';
    }
    else{
      mstr=(Math.abs(em-dm)+1)+' Month(s)'
    }
    return ystr+mstr;

  }

  ngOnInit(): void {
    this.tab='home';
    this.doctor_id=this.route.snapshot.paramMap.get('id')||'';
    this.user=this.as.getUser();
    if(this.user.role=='user'){
      this.ds.userFromId(this.user.profile).subscribe((data:any) => {
        this.userProfile=data;

      })
    

    }
    

    if(this.doctor_id){
    this.ds.getDoctor(this.doctor_id).subscribe(doctor=>{
      console.log('doctor'+doctor);
      this.doctor=doctor;
      console.log(this.doctor);
      if(this.doctor.userRatings){
      this.ratingObj=this.doctor.userRatings;
      this.rating=(this.doctor.userRatings.avgRating*20-(this.doctor.userRatings.avgRating*20)%1)|0
      this.doctor.userRatings.reviews.forEach((el:any)=>{
        if(el.user==this.user.profile&&this.user.role=='user'){
          this.myReview={review:el.review,updated:el.updated,rating:el.rating}
          this.myTempRating=el.rating;
          this.myTempReview=el.review;
          

        }
        else{

          this.ds.userFromId(el.user).subscribe((u:any)=>{
            console.log(el.user);
  
            this.reviews.push({user:u,review:el.review,rating:el.rating,updated:el.updated});
  
          })

        }

        

      });
      console.log('review')
      console.log(this.reviews);
      }
      
      this.doctor=this.doctor.doctor;
    },(err)=>{
      if(err instanceof HttpErrorResponse) this.router.navigate(['/404']);

    });
      }
    

  }

ngAfterViewInit(n:number=0): void {
  if(n==2){
    this.tab='profile';
  }

}

  f():any{
    console.log(this.doctor)
    this.doctor=this.doctor
  }
  dateCreator(s:string):string{
    let d=new Date(s);
    return d.toLocaleDateString();


  }

}
