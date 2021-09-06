

export class CalenderGrid{

    constructor(private date?:Date){
        for(let i=0;i<5;i++){
            this.monthGrid.push([
                {day:0,marked:false},
                {day:0,marked:false},
                {day:0,marked:false},
                {day:0,marked:false},
                {day:0,marked:false},
                {day:0,marked:false},
                {day:0,marked:false}
            ])
        }
        for(let i=0;i<12;i++){
            this.yearGrid.push(this.monthGrid);
        }
        this.sampleDate=this.date||(new Date());
        this.sampleDate.setDate(1);

      


    }
        private monthGrid:any[][]=[];
        private yearGrid:any[]=[];
        private sampleDate:Date;
     

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
private getMonths(year:number){

    let months:Array<any>=[
        {name:'January',days:31},
        {name:'February',days:(this.isLeapYear(year)?29:28)},
        {name:'March',days:31},
        {name:'April',days:30},
        {name:'May',days:31},
        {name:'June',days:30},
        {name:'July',days:31},
        {name:'August',days:31},
        {name:'September',days:30},
        {name:'October',days:31},
        {name:'November',days:30},
        {name:'December',days:31}

        
        
    ]

    return months;
    

}
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


public getMonthGrid(d:Date=this.sampleDate):any{
    let monthGrid=this.clone(this.monthGrid);
    let months=this.getMonths(d.getFullYear());
    // console.log(monthGrid===this.monthGrid)
    let m=months[d.getMonth()].days;
    let b=d.getDay();
    for(let i=0;i<m;i++){
        let s=(i+b)%35;
        monthGrid[Math.floor(s/7)][s%7]={day:i+1,marked:false};
      }
     
    return {monthGrid,bias:b};
}
public getYearGrid(year:number=this.sampleDate.getFullYear()):any{
    let months=this.getMonths(year);
    let yearGrid=this.clone(this.yearGrid);
    for(let i=0;i<12;i++){
        let mg=this.getMonthGrid(new Date(year,i,1));
        yearGrid[i]={grid:mg.monthGrid,month:months[i],bias:mg.bias};
        
        
    }
    return {yearGrid,year};
}
      

    
    

    

}