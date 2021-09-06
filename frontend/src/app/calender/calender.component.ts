import { Component, OnInit ,Input,Output, EventEmitter} from '@angular/core';
import { CalenderGrid } from '../calenderGrid';
import { FirebaseUploadService } from '../firebase-upload.service';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

@Input() marker:any={};
@Output() dateSelectEvent = new EventEmitter<Date>();
  
  constructor(public fs:FirebaseUploadService) { }

  private cg: CalenderGrid=new CalenderGrid();
  
  yearGrid:any=this.cg.getYearGrid();
  datetoday:Date=new Date();
  month:number=this.datetoday.getMonth();
  year:number=this.datetoday.getFullYear();
  dateCreator(year:number,month:number,date:any):void{
    if(date.marked){
      let d=new Date(year,month,date.day);
      this.dateSelectEvent.emit(d);
    

    }



  }
  markDates(marker:any){
    if(marker.hasOwnProperty('weekly')){
      let weekly:any=marker.weekly;
     
      weekly.forEach((el:any) => {
        for(let i=0;i<12;i++){
          let v=this.yearGrid.yearGrid[this.datetoday.getMonth()].bias+this.datetoday.getDate()-1;
          for(let j=0;j<5;j++){
            

            if(this.yearGrid.year>this.datetoday.getFullYear()||i>this.datetoday.getMonth()||j>Math.floor( v/7)||el.day>this.datetoday.getDay()){
              this.yearGrid.yearGrid[i].grid[j][el.day].marked=true;
              
            }
            
          
          }

        }
        

        
      });


    }
    if(marker.hasOwnProperty('monthly')){

      let monthly:any=marker.monthly;
      monthly.forEach((el:any) => {
        for(let i=0;i<12;i++){
          let v=this.yearGrid.yearGrid[i].bias+el.date-1;
          let d=this.yearGrid.yearGrid[i].month.days
          // console.log(d)

            
            if(el.date<d&&this.yearGrid.yearGrid[i].grid[Math.floor(v/7)][v%7].day==el.date&&(i>this.datetoday.getMonth()||el.date>this.datetoday.getDate())){

              console.log('s');
              this.yearGrid.yearGrid[i].grid[Math.floor(v/7)][v%7].marked=true;
            }

            

        }
        

        
      });


    }
    if(marker.hasOwnProperty('onetime')){
      let onetime=marker.onetime;
      onetime.forEach((el:any) => {
        let sDate=new Date(el.schedule.start);

        let month=sDate.getMonth();
        let date=sDate.getDate();
        let year=sDate.getFullYear();
        let v=this.yearGrid.yearGrid[month].bias+date-1;


        if(this.yearGrid.year==year&&this.datetoday<sDate){
         
          this.yearGrid.yearGrid[month].grid[Math.floor(v/7)][v%7].marked=true;

          


        }

      })
      // let month=0;
      // let date=0;
      // let year;
      // if(this.yearGrid.year==year){
      //   this.yearGrid[month].grid.forEach((el:any) =>{
      //     if(el.day==date){
      //       el.marked=true;
      //     }
      //   })
      // }
    }
  }
 
  time:any;


prevBtn():void{
  if(this.year>this.datetoday.getFullYear()||this.month>this.datetoday.getMonth()){
    if(this.month==0){
      this.year=this.year-1;
      this.yearGrid=this.cg.getYearGrid(this.year);
      console.log(this.yearGrid);
    }
    this.month=(this.month-1+12)%12;
    console.log(this.yearGrid);
    this.ngOnInit();
    

  }
  
  



}
nextBtn():void{

  if(this.month==11){
    this.year=this.year+1
    this.yearGrid=this.cg.getYearGrid(this.year);
  }
  this.month=(this.month+1)%12;
  console.log(this.month+' '+this.year);
  this.ngOnInit();

}
  
  ngOnInit(): void {
    this.markDates(this.marker);
    console.log(this.yearGrid);
  }

}
