import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private ds:DoctorService,private route: ActivatedRoute) { }
  doctor:any={};
  ratingObj:any={};
  rating:number=0;
  tab:string='home';
  editReview:boolean=false;
  reviews:Array<any>=[];

  toggleEdit(state:boolean):void{
    this.editReview=state;
 

  }

  ngOnInit(): void {
    this.tab='home';
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
    this.ds.getDoctor(id).subscribe(doctor=>{
      this.doctor=doctor;
      if(this.doctor.userRatings){
      this.ratingObj=this.doctor.userRatings;
      this.rating=(this.doctor.userRatings.avgRating*20-(this.doctor.userRatings.avgRating*20)%1)|0
      this.doctor.userRatings.reviews.forEach((el:any)=>{

        this.ds.userFromId(el.user).subscribe((u:any)=>{
          console.log(el.user);

          this.reviews.push({user:u,review:el.review,rating:el.rating,updated:el.updated});

        })

      });
      console.log(this.reviews);
      }
      
      this.doctor=this.doctor.doctor;
    });
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
