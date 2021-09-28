import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';
import { NotifictionService } from '../notifiction.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
  status:string='rejected';
  user_id:string='';
  user:any;
  scheduleStatus:Array<any>=[];

  constructor(private ds:DoctorService,private as:AuthService,private ns:NotifictionService,private router:Router) { }


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
  console.log(id)
  this.ds.confirmAppointment(id,'canceled').subscribe(data => {
    this.ns.notify(data);
    this.ngOnInit();
    
  });

}


  ngOnInit(): void {
    if(this.as.isLoggedIn()){
      let u=this.as.getUser();
      if(u.role=='user'){
        this.user_id=u.profile;
        this.ds.userFromId(this.user_id).subscribe((data:any) =>{
          this.user=data;
    
        })
      }
    }
    else{
      this.router.navigate(['/login']);

    }
   
    this.ds.getScheduleStatus(this.user_id).subscribe((data:any) =>{
      this.scheduleStatus=[];
      // console.log(data);
      data.forEach((el:any)=>{
        // console.log(el);
        
          this.scheduleStatus.push({doctor:el.doctor.name,status:el.schedule.status,schedule:new Date(el.schedule.schedule),id:el.schedule._id});
          // console.log(el.schedule.id);
        
      })
      // console.log(this.scheduleStatus);
    })
  }

}