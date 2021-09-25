import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';
import { NotifictionService } from '../notifiction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ns:NotifictionService,private as:AuthService,private ds:DoctorService) { }
  nshow:boolean=false;
  user:any={profile:'',role:''};
  ncontent:string='';
  ntype:string='err';
  profile:any={name:''};
  links:Array<any>=[];

  searchResult():void{
    // console.log('keyup');
    this.ns.notify({msg:'p123rtv agajh hs hello kelly!',type:'err'});
  }
  ngOnInit(): void {
    this.user=this.as.getUser();
    console.log(this.user);
    if(this.user.role&&this.user.role=='admin'){
      

    }
    else if(this.user.role&&this.user.role=='doctor'){
      this.ds.doctorFromId(this.user.profile).subscribe((data:any) => {
        this.profile=data;
        this.links=[
          {name:'Search',link:'/search'},
          {name:'Home',link:'/'},
          {name:'Profile',link:'/profile/doctor'},
          {name:'LogOut',link:'logout'}
      ]
      
        

      });
      

    }
    else if(this.user.role&&this.user.role=='user'){
      this.ds.userFromId(this.user.profile).subscribe((data:any) => {
        this.profile=data;
        this.links=[
          {name:'Search',link:'/search'},
          {name:'Home',link:'/'},
          {name:'Profile',link:'/profile/user'},
          {name:'LogOut',link:'logout'}
      ]
      

      });
      
    }
    else if(!this.as.isLoggedIn()){
      this.links=[
        {name:'Search',link:'/search'},
        {name:'Home',link:'/'},
        {name:'LogIn',link:'/login'},
        {name:'SignUp',link:'/signup'},
    ]
        
    }

    
    this.as.authBroadcast.subscribe({
      next:(u)=>{
        this.user=u.user;
        if(this.user.role||this.user.role=='admin'){
      

        }
        else if(this.user.role||this.user.role=='doctor'){
          this.ds.doctorFromId(this.user.profile);
          
    
        }
        else if(this.user.role||this.user.role=='user'){
          this.ds.userFromId(this.user.profile);
    
        }
        

      }
    })
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
