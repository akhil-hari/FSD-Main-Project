import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ratings',
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
      this.rating=n;
      

  }
  leave():any{
    this.rating=this.tempRating;

  }
  rateConfirm():any{
    this.tempRating=this.rating;
    console.log('ops')
    this.outputRating.emit(this.tempRating)
  }

  ngOnInit(): void {
    
      this.rating=this.inputRating;
      // this.rating=10;
  }

}
