import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private ds:DoctorService) { }
  doctor:any={};
  ratingObj:any={};
  rating:number=0;

  ngOnInit(): void {
    this.ds.getDoctor('60f19de2dff78773927ffafe').subscribe(doctor=>{
      this.doctor=doctor;
      this.ratingObj=this.doctor.userRatings;
      this.rating=(this.doctor.userRatings.avgRating*20-(this.doctor.userRatings.avgRating*20)%1)|0
      this.doctor=this.doctor.doctor;
    });
    

  }
  f():any{
    console.log(this.doctor)
    this.doctor=this.doctor
  }

}
