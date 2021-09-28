import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  constructor() { }
  @Input('rating')
  inputRating: number=0;
  rating:number=0;
  tempRating:number=0;
  @Input()
  mode:string="get";
  @Output('ratingOutput')
  outputRating:EventEmitter<number>=new EventEmitter<number>();
  rate(n:number):any{
      this.tempRating=this.rating;
      this.rating=n*1.1;
      

  }
  leave():any{
    this.rating=this.tempRating;

  }
  private round(n:number):number{
    let r=n%1;
    if(r==0){
      return n;
    }
    else if(r>0.5){
      return Math.ceil(n);
    }
    else {
      return Math.floor(n);
    }
  }
  rateConfirm():any{
    this.tempRating=this.rating;
    // console.log(this.round(this.tempRating/1.1));
    this.outputRating.emit(this.round(this.tempRating/1.1))
  }

  ngOnInit(): void {
    // console.log(this.inputRating)
    
      this.rating=this.inputRating*1.1;
      // this.rating=10;
  }

}
