import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor } from './helper/JwtInterceptor';
import { ReqErrorInterceptor } from './helper/ReqErrorInterceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Roles } from './roles.enum';
import { User} from './user';
import { AlertComponent } from './alert/alert.component';
import { AdminComponent } from './admin/admin.component';
import { ParentComponent } from './parent/parent.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ListClassComponent } from './list-class/list-class.component';
import { ListStudentsDisplayComponent } from './list-students-display/list-students-display.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    RegisterComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    AddStudentComponent,
    ListStudentsComponent,
    AddClassComponent,
    ListClassComponent,
    ListStudentsDisplayComponent
 
    
   
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ {
  provide : HTTP_INTERCEPTORS, useClass:JwtInterceptor,  multi:true
  },
  {provide : HTTP_INTERCEPTORS, useClass:ReqErrorInterceptor,  multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
