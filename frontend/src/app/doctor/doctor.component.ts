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
      }
      
      this.doctor=this.doctor.doctor;
    });
      }
    

  }
  f():any{
    console.log(this.doctor)
    this.doctor=this.doctor
  }

}
