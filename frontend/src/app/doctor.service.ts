import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseUrl: string=environment.baseUrl;
  constructor(private http: HttpClient) { 

  }
  
  getDoctors(){
    let doctors=this.http.get(this.baseUrl+'api/list_doctors');
    return doctors;
  }

  getDoctor(id_string: string){
    let doctor=this.http.get(this.baseUrl+'api/doctor/'+id_string);
    return doctor;
  }

  getUpcomingVisits(id_string:string){
    let upcomingVisits=this.http.get(this.baseUrl+'api/upcoming_visits/'+id_string);
    return upcomingVisits;
  }
  getDoctorAvailable(id_string:string){
    let doctorAvailable=this.http.get(this.baseUrl+'api/doctor_available',{params:{id:id_string}});
    return doctorAvailable;
  }
  setDoctorSchedule(doctor:string,schedule:any,type: string){
    let setSchedule=this.http.post(this.baseUrl+'api/set_schedule',{doctor:doctor,schedule:schedule,type:type});
    return setSchedule;
  }
  userFromId(id_string:string):any{
    let user=this.http.get(this.baseUrl+'api/u',{params:{id:id_string}})
    return user;

  }
  search(query:string):any{
    let result=this.http.get(this.baseUrl+'api/search',{params:{q:query}})
    return result;
  }


}
