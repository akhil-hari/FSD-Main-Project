import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  hospital_id:string='';
  hospital:any;
  
  
  constructor(private ds:DoctorService,private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.hospital_id=this.route.snapshot.paramMap.get('id')||'';
    // console.log(this.hospital_id);
    this.ds.getHospital(this.hospital_id).subscribe( (data:any)=>{
     
      if(data.type!='err'){
        console.log(data);
        this.hospital=data;
        

      }
    })
   
    }

    
    // console.log(this.x);

  }


