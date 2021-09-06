import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component'
import { HospitalComponent } from './hospital/hospital.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from '../app/home/home.component'

const routes: Routes = [
{path:'doctor/:id',component:DoctorComponent},
{path:'hospital/:id',component:HospitalComponent},
{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
{path:'',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
