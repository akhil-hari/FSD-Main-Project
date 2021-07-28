import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service'



@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  x:any;
  constructor(private ds:DoctorService) { }
  async getDoctors():Promise<any>{
    await this.ds.getDoctors().subscribe((doctors:any)=>{
      this.x=doctors;
      console.log(this.x);

  });
}

  ngOnInit(): void {
   
    }

    
    // console.log(this.x);

  }


