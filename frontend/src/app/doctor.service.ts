import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseUrl: string='http://localhost:8080/'
  constructor(private http: HttpClient) { 

  }
  doctors:any;
  getDoctors():any{
    this.doctors=this.http.get(this.baseUrl+'api/list_doctors');
    return this.doctors;

  }
}
