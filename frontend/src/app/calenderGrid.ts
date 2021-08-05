

export class CalenderGrid{

    constructor(private date?:Date){
        for(let i=0;i<5;i++){
            this.monthGrid.push([0,0,0,0,0,0,0])
        }
        for(let i=0;i<12;i++){
            this.yearGrid.push(this.monthGrid);
        }
        this.sampleDate=this.date||(new Date());
        this.sampleDate.setDate(1);

        this.months=[
            {name:'jan',days:31},
            {name:'feb',days:(this.isLeapYear(this.sampleDate.getFullYear())?29:28)},
            {name:'mar',days:31},
            {name:'apr',days:30},
            {name:'may',days:31},
            {name:'jun',days:30},
            {name:'jul',days:31},
            {name:'aug',days:31},
            {name:'sep',days:30},
            {name:'oct',days:31},
            {name:'nov',days:30},
            {name:'dec',days:31}
            
            
        ]


    }
        private monthGrid:number[][]=[];
        private yearGrid:any[]=[];
        private sampleDate:Date;
        private months:Array<any>;

// Clone an object and return the clone
private clone(obj:any):any {
    let newObj:any = (obj instanceof Array) ? [] : {};
    for (let prop in obj) {
        if(typeof obj[prop] === 'object') {
            newObj[prop] = this.clone(obj[prop]);
        }
        else{
            newObj[prop] = obj[prop]
        }
       
    }
    return newObj;
};

private isLeapYear(y:number):boolean{

    //function to check an year is leapyear or not according to georgian calender{normal calender we use in our day to day}
    
        if(y%100==0){
            if(y%400==0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
        
            if(y%4==0){
                return true;
            }
            else{
                return false;
            }
        }
    }


public getMonthGrid(d:Date=this.sampleDate):Array<any>{
    let monthGrid=this.clone(this.monthGrid);
    // console.log(monthGrid===this.monthGrid)
    let m=this.months[d.getMonth()].days;
    let b=d.getDay();
    for(let i=0;i<m;i++){
        let s=(i+b)%35;
        monthGrid[Math.floor(s/7)][s%7]=i+1;
      }
     
    return monthGrid;
}
public getYearGrid():Array<any>{
    let yearGrid=this.clone(this.yearGrid);
    for(let i=0;i<12;i++){
        yearGrid[i]=this.getMonthGrid(new Date(this.sampleDate.getFullYear(),i,1));
        
        
    }
    return yearGrid;
}
      

    
    

    

}