import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component'
import { HospitalComponent } from './hospital/hospital.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { Page404Component } from './page404/page404.component'
import { doctorGuard } from './auth.guard';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DoctorProfileComponent } from './doctorprofile/doctorprofile.component';
import { UserProfileComponent } from './userprofile/userprofile.component';


const routes: Routes = [
{path:'doctor/:id',component:DoctorComponent},
{path:'hospital/:id',component:HospitalComponent},
{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
{path:'',component:HomeComponent},
{path:'search',component:SearchComponent,canActivate:[doctorGuard]},
{path:'profile/doctor',component:DoctorProfileComponent},
{path:'profile/user',component:UserProfileComponent},
// {path:'login/admin',component:},

{path:'bookappointment/:id',component:BookAppointmentComponent},

{path:'**',component:Page404Component}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
