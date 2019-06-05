import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ParentComponent } from './parent/parent.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ListStudentsDisplayComponent} from './list-students-display/list-students-display.component';
import {AuthGuard} from './authguard';
import { Roles} from './roles.enum';
 
import { ListClassComponent } from './list-class/list-class.component';

const routes: Routes = [  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin', component:AdminComponent, canActivate: [AuthGuard], 
        data: { roles: [Roles.Admin] } },
  {path: 'addstudent',component:AddStudentComponent},
   {path: 'addclass',component:AddClassComponent},
   {path: 'listclass', component:ListClassComponent},
   {path: 'liststudents',component:ListStudentsComponent},
   {path: 'teacher',component:TeacherComponent, canActivate: [AuthGuard], 
        data: { roles: [Roles.Teacher] }},
   {path: 'parent',component:ParentComponent,canActivate: [AuthGuard], 
        data: { roles: [Roles.Parent] }},
   {path: 'studentlist/:classNumber', component:ListStudentsDisplayComponent}
   ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
