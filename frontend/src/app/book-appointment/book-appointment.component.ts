import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service'

@Component({
  selector: 'book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  constructor(private ds:DoctorService) { }
  schedule:any;
  selectedDate:any='';
  selectedDateSchedule:Array<any>=[];


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
          this.selectedDateSchedule.push({appointment:sdate,start:`${sdate.getHours()}:${sdate.getMinutes()}`,end:`${edate.getHours()}:${edate.getMinutes()}`})
  
        }
  
      });

    }

    if(this.schedule.hasOwnProperty('monthly')){
      this.schedule.monthly.forEach((el:any)=>{
        if(el.date==date){
          let sdate=new Date(this.selectedDate.toDateString()+' '+el.schedule.start)
          let edate=new Date(this.selectedDate.toDateString()+' '+el.schedule.end)
          this.selectedDateSchedule.push({appointment:sdate,start:`${sdate.getHours()}:${sdate.getMinutes()}`,end:`${edate.getHours()}:${edate.getMinutes()}`});
  
        }
  
      });

    }

    if(this.schedule.hasOwnProperty('onetime')){
      this.schedule.onetime.forEach((el:any)=>{
        let sdate=new Date(el.schedule.start)
        let edate=new Date(el.schedule.end)

        if(sdate.getDay()==day&&sdate.getDate()==date&&sdate.getMonth()==month){

          this.selectedDateSchedule.push({appointment:sdate,start:`${sdate.getHours()}:${sdate.getMinutes()}`,end:`${edate.getHours()}:${edate.getMinutes()}`});


        }

      })
    }

    
    console.log(this.selectedDateSchedule);
    




  }



  ngOnInit(): void {
    this.ds.getDoctorAvailable('60f19de2dff78773927ffafe').subscribe(result=>{
      this.schedule=result;
      
    })
  }

}
