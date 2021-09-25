import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';

import { DoctorComponent } from './doctor/doctor.component'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component'
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HospitalComponent } from './hospital/hospital.component';
import { RatingsComponent } from './ratings/ratings.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CalenderComponent } from './calender/calender.component';
import { DoctorProfileComponent } from './doctorprofile/doctorprofile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatDialogModule} from '@angular/material/dialog'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule } from "@angular/fire/storage";
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { Page404Component } from './page404/page404.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { AuthInterceptor } from './authInterceptor';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HospitalComponent,
    RatingsComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    CalenderComponent,
    HomeComponent,
    
    DoctorProfileComponent,
         BookAppointmentComponent,
         Page404Component,
         UserProfileComponent,
         AdminhomeComponent,
         AddHospitalComponent,
         AddAdminComponent,
         AboutComponent,
         AdminLoginComponent,
         LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatExpansionModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
   
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
