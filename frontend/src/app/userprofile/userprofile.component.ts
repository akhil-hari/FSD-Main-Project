import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
  status:string='rejected';
  user_id:string='60fd784b02bcac2f325dd57c';
  user:any;
  scheduleStatus:Array<any>=[];

  constructor(private ds:DoctorService,private as:AuthService) { }


  private twoDigit(n:number):string{

    if(n<10){
      return('0'+n);
    }
    else{
      return(n.toString());
    }


}

twoDigitTime(n:Date):string{
  let h=this.twoDigit(n.getHours());
  let m=this.twoDigit(n.getMinutes());
  return `${h}:${m}`;

}

cancelBtn(id:string){
  this.ds.confirmAppointment(id,'canceled').subscribe(data => {
    this.ngOnInit();
    
  });

}


  ngOnInit(): void {
    this.ds.userFromId(this.user_id).subscribe((data:any) =>{
      this.user=data;

    })
    this.ds.getScheduleStatus(this.user_id).subscribe((data:any) =>{
      this.scheduleStatus=[];
      console.log(data);
      data.forEach((el:any)=>{
        
          this.scheduleStatus.push({doctor:el.doctor.name,status:el.schedule.status,schedule:new Date(el.schedule.schedule),id:el.schedule.id});
        
      })
      console.log(this.scheduleStatus);
    })
  }

}
