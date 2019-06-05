import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthService } from '../authservice.service';
import { AlertService } from '../alertservice.service';
import { Classroom} from '../classroom';
import { User} from '../user';

import { ClassService } from '../class.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
    classForm: FormGroup;
    loading = false;
    submitted = false;
    classroom = new Classroom();
    userlist :User[] =[];
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService,
    private alertService: AlertService,
    private classService : ClassService
    ) {
     
     
    }

  ngOnInit() {
    this.classForm = this.formBuilder.group({
            classNumber: ['', Validators.required],
            teacher: ['', Validators.required]});
            
    this.classService.fetchallTeachers().subscribe(data => {
            this.userlist = data;
        });
        

           
  }
  
   get f() { return this.classForm.controls; }
   
    onSubmit() {
        this.submitted = true;
        

        // stop here if form is invalid
        if (this.classForm.invalid) {
            return;
        }
   
        this.loading = true;
        
        this.classroom.classNumber = this.f.classNumber.value;
        this.classroom.teacherUserName = this.f.teacher.value;
        this.classroom.homework ="";
       
       
        this.classService.createClass(this.classroom)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success("New class created sucessfully", true);
                    console.log("Inside addClassComponent component "+ "sucess");
                   
                   this.router.navigate(['/admin']);
                    
                    
                },
                error => {
                console.log("inside addClassComponent component before "+error);
                    this.alertService.error(error, true);
                     console.log("inside addClassComponent component "+  error.error +error.message +error.status+ error.statusText);
                    this.loading = false;
                });
    }

}
