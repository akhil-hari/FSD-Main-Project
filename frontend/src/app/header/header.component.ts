import { Component, OnInit } from '@angular/core';
import { NotifictionService } from '../notifiction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ns:NotifictionService) { }
  nshow:boolean=false;
  ncontent:string='';
  ntype:string='err';
  searchResult():void{
    // console.log('keyup');
    this.ns.notify({msg:'p123rtv agajh hs hello kelly!',type:'err'});
  }
  ngOnInit(): void {
    this.ns.notification.subscribe({
      next:(obj)=>{
        this.nshow=true;
        this.ncontent=obj.msg;
        this.ntype=obj.type;

        
        setTimeout(()=>{this.nshow=false;this.ncontent=''},8000);
      }
    })
    

  }

  capitalize(s:string):string {
    s=s.slice(0,1).toUpperCase()+s.slice(1,s.length).toLowerCase();
    return s;
    
  }

}
