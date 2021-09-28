import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component'
import { HospitalComponent } from './hospital/hospital.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { Page404Component } from './page404/page404.component'
import { commonGuard,doctorGuard,userGuard,adminGuard } from './auth.guard';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DoctorProfileComponent } from './doctorprofile/doctorprofile.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
{path:'doctor/:id',component:DoctorComponent,canActivate:[commonGuard]},
{path:'hospital/:id',component:HospitalComponent,canActivate:[commonGuard]},
{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
{path:'',component:HomeComponent},
{path:'search',component:SearchComponent},
{path:'profile/doctor',component:DoctorProfileComponent,canActivate:[doctorGuard]},
{path:'profile/user',component:UserProfileComponent,canActivate:[userGuard]},
{path:'logout',component:LogoutComponent},
// {path:'login/admin',component:},

{path:'bookappointment/:id',component:BookAppointmentComponent,canActivate:[userGuard]},

{path:'404',component:Page404Component},
{path:'**',redirectTo:'/404',pathMatch:'full'},




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
