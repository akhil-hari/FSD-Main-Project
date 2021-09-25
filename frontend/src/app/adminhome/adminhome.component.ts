import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  searchInput:string='';

  constructor(private ds:DoctorService,private r:Router) { }
  searchResult:any=[]

  search(query: string){
    console.log(this.searchInput);

    this.ds.search(query).subscribe((r:any)=>{
      this.searchResult=r;
    })

  }
  forward(s:string): void {
    this.r.navigate(['doctor/'+s]);
    
  }

  ngOnInit(): void {
    this.search(this.searchInput);
    
  }
}
