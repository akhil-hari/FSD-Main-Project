import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service'
import { NotifictionService} from '../notifiction.service'

@Component({
  selector: 'book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  constructor(private ds:DoctorService,private ns:NotifictionService,private route: ActivatedRoute,private as:AuthService,private router: Router) { }
  schedule:any;
  selectedDate:any='';
  selectedDateSchedule:Array<any>=[];
  selectedSlot:string='';
  user_id:string="60fd784b02bcac2f325dd57c"
  doctor:string=""
  doctorProfile:any={};
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
bookAppointment(){
  this.ds.bookAppointment(this.doctor,this.user_id,new Date(this.selectedSlot)).subscribe(data => {
    this.ns.notify(data);

  })

}


  select(event: Date){
    this.selectedDateSchedule=[]
    this.selectedDate=event;
    let day=event.getDay();
    let date=event.getDate();
    let month=event.getMonth();

    if(this.schedule.hasOwnProperty('weekly')){
      this.schedule.weekly.forEach((el:any)=>{
        if(el.day==day){
          let sdate=new Date(this.selectedDate.toDateString()+' '+el.schedule.start)
          let edate=new Date(this.selectedDate.toDateString()+' '+el.schedule.end)
          this.selectedDateSchedule.push({appointment:sdate,start:`${this.twoDigitTime(sdate)}`,end:`${this.twoDigitTime(edate)}`})
  
        }
  
      });

    }

    if(this.schedule.hasOwnProperty('monthly')){
      this.schedule.monthly.forEach((el:any)=>{
        if(el.date==date){
          let sdate=new Date(this.selectedDate.toDateString()+' '+el.schedule.start)
          let edate=new Date(this.selectedDate.toDateString()+' '+el.schedule.end)
          this.selectedDateSchedule.push({appointment:sdate,start:`${this.twoDigitTime(sdate)}`,end:`${this.twoDigitTime(edate)}`});
  
        }
  
      });

    }

    if(this.schedule.hasOwnProperty('onetime')){
      this.schedule.onetime.forEach((el:any)=>{
        let sdate=new Date(el.schedule.start)
        let edate=new Date(el.schedule.end)

        if(sdate.getDay()==day&&sdate.getDate()==date&&sdate.getMonth()==month){

          this.selectedDateSchedule.push({appointment:sdate,start:`${this.twoDigitTime(sdate)}`,end:`${this.twoDigitTime(edate)}`});


        }

      })
    }

    
    console.log(this.selectedDateSchedule);
    




  }



  ngOnInit(): void {
    this.doctor=this.route.snapshot.paramMap.get('id')||'';
    if(!this.doctor) this.router.navigate(['/404']);
    this.ds.doctorFromId(this.doctor).subscribe((data:any) =>{
      if(!data)  this.router.navigate(['/404']);
      this.doctorProfile=data;
      console.log(this.doctorProfile);
    })
    if(this.as.isLoggedIn()){
      let u=this.as.getUser();
      if(u.role=='user'){
        this.user_id=u.profile;
  
      }
    }

    else{
      this.router.navigate(['/login']);

    }

    this.ds.getDoctorAvailable(this.doctor).subscribe(result=>{
      this.schedule=result;
      
    })
  }

}
