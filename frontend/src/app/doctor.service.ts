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
  getHospital(id:string){
    let result=this.http.get(this.baseUrl+'api/h',{params:{id}});
    return result;
  }

  getUpcomingVisits(id_string:string){
    let upcomingVisits=this.http.get(this.baseUrl+'api/upcoming_visits/',{params:{id:id_string}});
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
  doctorFromId(id_string:string):any{
    let doctor=this.http.get(this.baseUrl+'api/d',{params:{id:id_string}})
    return doctor;

  }
  confirmAppointment(id:string,mode:string){
   let result=this.http.post(this.baseUrl+'api/confirm_appointment',{id,mode})
   return result;
  }
  getCountOfConfirmed(schedule:any,id:string){
    console.log(schedule)
    let result=this.http.get(this.baseUrl+'api/confirmed_count',{params:{schedule,id}});
    return result;

  }
  getVisitsToday(id:string){
    let result=this.http.get(this.baseUrl+'api/visits_today',{params:{id}});
    return result;
    

  }
bookAppointment(doctor:string,user:string,schedule:Date){
  let result=this.http.post(this.baseUrl+'api/book_appointment',{user,schedule,doctor})
  return result;
}
getScheduleStatus(id:string){
  let result=this.http.get(this.baseUrl+'api/schedule_status',{params:{id}});
  return result;

}
  search(query:string):any{
    let result=this.http.get(this.baseUrl+'api/search',{params:{q:query}})
    return result;
  }
searchHospital(query:string){
  let result=this.http.get(this.baseUrl+'api/search_hospital',{params:{q:query}});
  return result;
}
signUp(data:any){
  let result=this.http.post(this.baseUrl+'api/signup',{data});
  return result;
}

}
