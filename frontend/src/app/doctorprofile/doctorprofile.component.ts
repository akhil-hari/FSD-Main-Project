import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { FormControl,FormGroup,Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import {MatExpansionPanel} from '@angular/material/expansion';





@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorProfileComponent implements OnInit,AfterViewInit {

  constructor(private ds:DoctorService) { }
  schedule:any;
  
  tab:string='visitInfo';

  addBtnState:any={
    w:false,
    m:false,
    o:false,
  }
  weeklyForm:FormGroup=new FormGroup({
    day:new FormControl('',[Validators.required]),
    start:new FormControl('',[Validators.required]),
    end:new FormControl('',[Validators.required])
  });

  monthlyForm:FormGroup=new FormGroup({
    date:new FormControl('',[Validators.required]),
    start:new FormControl('',[Validators.required]),
    end:new FormControl('',[Validators.required])
  });

  onetimeForm:FormGroup=new FormGroup({
    date:new FormControl('',[Validators.required]),
    start:new FormControl('',[Validators.required]),
    end:new FormControl('',[Validators.required])
  });

  @ViewChild('weeklyExp')
  weeklyExp!: MatExpansionPanel;

  @ViewChild('monthlyExp')
  monthlyExp!: MatExpansionPanel;

  @ViewChild('onetimeExp')
  onetimeExp!:MatExpansionPanel;

  @ViewChild('visitsToday')
  visitsTodayExp!: MatExpansionPanel;

  @ViewChild('pendingAppointments')
  pendingAppointmentsExp!: MatExpansionPanel;



  
  days:Array<any>=[];
  dates:Array<any>=[];
  onetime:Array<any>=[];
  notOnEveryMonth:boolean=false;
  startdate:Date = new Date();
  upcomingVisits:Array<any>=[];
  doctor_id:string='60f19de2dff78773927ffafe';
clickfn():void{
  console.log(this.weeklyForm.value);
}

toggleAddBtnState(id:string,state:boolean):void{
  this.addBtnState[id] = state;


}


saveBtn(type:string){

  if(type=='weekly'){
    let item=this.weeklyForm.value;
    console.log(item);
    let s=this.schedule.weekly.find((el:any)=>{
        if(el.day==item.day){
          let i=this.schedule.weekly.indexOf(el);
          this.schedule.weekly[i]={day:parseInt(item.day),schedule:{start:this.timeStringGenerator(item.start),end:this.timeStringGenerator(item.end)}};

          this.ds.setDoctorSchedule('60f19de2dff78773927ffafe',this.schedule.weekly,"weekly").subscribe((result:any)=>{
            console.log(result);
            this.ngOnInit();
            this.ngAfterViewInit(1);
            this.toggleAddBtnState('w',false);
          });
          return true;
        }
        else{
          return false;
        }


    })
    if(!s){
      this.schedule.weekly.push({day:parseInt(item.day),schedule:{start:this.timeStringGenerator(item.start),end:this.timeStringGenerator(item.end)}});
      this.schedule.weekly=this.schedule.weekly.sort((el1:any,el2:any)=>{
        if(el1.day>el2.day){
          return 1; 
        }
        else{
          return -1;
        }
      });
      this.ds.setDoctorSchedule(this.doctor_id,this.schedule.weekly,"weekly").subscribe((result:any)=>{
        console.log(result);
        this.ngOnInit();
        this.ngAfterViewInit(1);
        this.toggleAddBtnState('w',false);
      });
    }
  }



  else if(type=='monthly'){
    let item=this.monthlyForm.value;
    
    let s=this.schedule.monthly.find((el:any)=>{
        if(el.date==item.date){
          let i=this.schedule.monthly.indexOf(el);
          this.schedule.monthly[i]={date:parseInt(item.date),schedule:{start:this.timeStringGenerator(item.start),end:this.timeStringGenerator(item.end)}};
          
          this.ds.setDoctorSchedule(this.doctor_id,this.schedule.monthly,"monthly").subscribe((result:any)=>{
            
            this.ngOnInit();
            this.ngAfterViewInit(2);
            this.toggleAddBtnState('m',false);
          });
          return true;
        }
        else{
          return false;
        }


    })
    if(!s){
      this.schedule.monthly.push({date:parseInt(item.date),schedule:{start:this.timeStringGenerator(item.start),end:this.timeStringGenerator(item.end)}});
      this.schedule.monthly=this.schedule.monthly.sort((el1:any,el2:any)=>{
        if(el1.date>el2.date){
          return 1; 
        }
        else{
          return -1;
        }
      });

      this.ds.setDoctorSchedule(this.doctor_id,this.schedule.monthly,"monthly").subscribe((result:any)=>{
        
        this.ngOnInit();
        this.ngAfterViewInit(2);
        this.toggleAddBtnState('m',false);
      });
    }
  }
  else if(type=='onetime'){
    let item=this.onetimeForm.value;
    
    this.ds.setDoctorSchedule(this.doctor_id,[{schedule:{start:this.timeStringGenerator(item.start,'full',item.date),end:this.timeStringGenerator(item.end,'full',item.date)},mode:1}],"onetime").subscribe((result:any)=>{
      console.log(result);
        
      this.ngOnInit();
      this.ngAfterViewInit(3);
      this.toggleAddBtnState('o',false);
    });



  }



}
removeBtn(item:any,type:string):void{
  if(type=='weekly'){

    // let s;
    for(let i=0;i<this.schedule.weekly.length;i++){
      if(this.schedule.weekly[i].day==item.day){
        
        // s=this.schedule.weekly[i];
        // console.log(i);
        this.schedule.weekly.splice(i,1);
        this.ds.setDoctorSchedule(this.doctor_id,this.schedule.weekly,"weekly").subscribe((result:any)=>{
          console.log(result);
          this.ngOnInit();
          this.ngAfterViewInit(1);
        });
        
        

       
        
      }
      


    }



  }
  else if(type=='monthly'){


    for(let i=0;i<this.schedule.monthly.length;i++){
      if(this.schedule.monthly[i].date==item.date){
        
        // s=this.schedule.weekly[i];
        // console.log(i);
        this.schedule.monthly.splice(i,1);
        this.ds.setDoctorSchedule(this.doctor_id,this.schedule.monthly,"monthly").subscribe((result:any)=>{
          console.log(result);
          this.ngOnInit();
          this.ngAfterViewInit(2);
        });
        
        
        

       
        
      }
      


    }



  }
  else if(type=='onetime'){

   let s=this.schedule.onetime.find((el:any)=>{
      if((new Date(el.schedule.start)).toLocaleDateString()==item.date){
        return true;

      }
      else{
        return false;
      }
    });
    s.mode=-1;
    console.log(s);
    this.ds.setDoctorSchedule(this.doctor_id,[s],"onetime").subscribe((result:any)=>{
      console.log(result);
      this.ngOnInit();
      this.ngAfterViewInit(3);
    });

    
    

  }

}


private dateFromTimeString(time:string){
  let date=new Date(1970,1,1);
  
  date=new Date(`${date.toDateString()} ${time}`);
  
  return date;
}


private timeStringGenerator(time:string,full:string='time',date?:Date):string{
  let t=(date&&full=='full')?date:new Date(1970,0,1);
  let a:any[]=time.split(/:| /);
  a[1]=parseInt(a[1]);
  if(a[2]=='PM'){
    a[0]=(parseInt(a[0])+12)%24;

  }
  t.setHours(a[0],a[1]);
  if(full=='full'){
    return t.toISOString();

  }
  else if(full=='time'){
    return t.toTimeString();
  }
  else{
    return '';
  }
  


}

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

confirmAppointment(id:string,mode:string){
  console.log(id)

  this.ds.confirmAppointment(id,mode).subscribe((data:any) =>{
    if(!data.type){
      console.log(data);
      this.ngOnInit();
      this.ngAfterViewInit(4);

    }
  })


}



  ngOnInit(): void {
    // this.ds.setDoctorSchedule('60f19de2dff78773927ffafe',{test1:'blah',test2:'wooo'},"weekly").subscribe();
    
    this.days=[
      {name:'Sunday',day:0,schedule:{}},
      {name:'Monday',day:1,schedule:{}},
      {name:'Tuesday',day:2,schedule:{}},
      {name:'Wednesday',day:3,schedule:{}},
      {name:'Thursday',day:4,schedule:{}},
      {name:'Friday',day:5,schedule:{}},
      {name:'Saturday',day:6,schedule:{}}
    ];
   
    this.ds.getDoctorAvailable(this.doctor_id).subscribe(result=>{
        this.schedule=result;
        if(this.schedule.hasOwnProperty('weekly')){
          this.schedule.weekly.forEach((el:any)=>{
            this.days[el.day].schedule={start:`${this.twoDigit(this.dateFromTimeString(el.schedule.start).getHours())}:${this.twoDigit(this.dateFromTimeString(el.schedule.start).getMinutes())}`,
                                        end:`${this.twoDigit(this.dateFromTimeString(el.schedule.end).getHours())}:${this.twoDigit(this.dateFromTimeString(el.schedule.end).getMinutes())}`
                                        
                                        };
            
          }

          )
        }


        if(this.schedule.hasOwnProperty('monthly')){
          let largest=0;
          this.dates=[];
          this.schedule.monthly.forEach((el:any)=>{
            largest=largest<el.date?el.date:largest;
            
            this.notOnEveryMonth=largest>28?true:false;


            this.dates.push({date:el.date,
                            start:`${this.twoDigit(this.dateFromTimeString(el.schedule.start).getHours())}:${this.twoDigit(this.dateFromTimeString(el.schedule.start).getMinutes())}`,
                            end:`${this.twoDigit(this.dateFromTimeString(el.schedule.end).getHours())}:${this.twoDigit(this.dateFromTimeString(el.schedule.end).getMinutes())}`
            })
          })


        }

        if(this.schedule.hasOwnProperty('onetime')){
          this.onetime=[];
          
          this.schedule.onetime.forEach((el:any)=>{
         
            

            this.onetime.push({date:(new Date(el.schedule.start)).toLocaleDateString(),
                            start:`${this.twoDigit(new Date(el.schedule.start).getHours())}:${this.twoDigit(new Date(el.schedule.start).getMinutes())}`,
                            end:`${this.twoDigit(new Date(el.schedule.end).getHours())}:${this.twoDigit(new Date(el.schedule.end).getMinutes())}`
            })
          })



        }
      
    });

    this.ds.getUpcomingVisits(this.doctor_id).subscribe((data:any)=>{
      this.upcomingVisits=[];
      console.log(data);
      // this.upcomingVisits=data;
      if(!data.type||data.type!='err'){
      data.forEach((el:any)=>{
        this.ds.userFromId(el.user).subscribe((u:any)=>{
          console.log(el.user);

          this.ds.getCountOfConfirmed(el.schedule,el._id).subscribe((count:any)=>{
            if(!(count.type&&count.type=='err')){
              this.upcomingVisits.push({user:u,schedule:new Date(el.schedule),id:el._id,count:count.count});
              console.log(count);
             
              console.log({user:u,schedule:new Date(el.schedule),id:el._id,count:count.count});
              
            }
            else{
              this.upcomingVisits.push({user:u,schedule:new Date(el.schedule),id:el._id,count:0});
              

            }
            

          })
          

          

        })


      })
    }
      console.log(this.upcomingVisits);
    });


    


  }

    ngAfterViewInit(n:number=0):void{
      if(n==1){
        this.tab='setSchedule';
        this.weeklyExp.open();


      }
      else if(n==2){
        this.tab='setSchedule';
        this.monthlyExp.open();
        // console.log('ghj');
  
      }
      else if(n==3){
        this.tab='setSchedule';
        this.onetimeExp.open();
      }
      else if(n==4){
        this.tab='visitInfo';
        this.pendingAppointmentsExp.open();
      }
      else if(n==5){
        this.tab='visitInfo';
        this.visitsTodayExp.open();
      }
  
      
    }
  

}
