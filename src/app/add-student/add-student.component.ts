import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthService } from '../authservice.service';
import { AlertService } from '../alertservice.service';
import { Classroom} from '../classroom';
import { User} from '../user';
import { Student} from '../student';
import { ClassService } from '../class.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
    addStudentForm: FormGroup;
    loading = false;
    submitted = false;
    student = new Student();
    classlist :Classroom[] =[];
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService,
    private alertService: AlertService,
    private classService : ClassService,
    private studentService : StudentService
    ) {
     
     
    }

  ngOnInit() {
    this.addStudentForm = this.formBuilder.group({
            studName: ['', Validators.required],
            classNumber: ['', Validators.required],
            parentUserName: ['', Validators.required]});
            
    this.classService.fetchallclasses().subscribe(data => {
            this.classlist = data;
        });
        

           
  }
  
   get f() { return this.addStudentForm.controls; }
   
    onSubmit() {
        this.submitted = true;
        

        // stop here if form is invalid
        if (this.addStudentForm.invalid) {
            return;
        }
   
        this.loading = true;
        
        this.student.studName = this.f.studName.value;
        this.student.classNumber = this.f.classNumber.value;
        this.student.parentUserName =this.f.parentUserName.value;
       
       
        this.studentService.createStudent(this.student)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success("New Student created sucessfully", true);
                    console.log("Inside addStudentComponent component "+ "sucess");
                   
                   this.router.navigate(['/admin']);
                    
                    
                },
                error => {
                console.log("inside addStudentComponent component before "+error);
                    this.alertService.error(error.error, true);
                     console.log("inside addStudentComponent component "+  error.error +error.message +error.status+ error.statusText);
                    this.loading = false;
                });
    }


}
