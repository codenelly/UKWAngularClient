import { Component, OnInit } from '@angular/core';
import {FormGroup , Validators,FormBuilder} from '@angular/forms';
import {Router } from '@angular/router';
import { Classroom } from '../classroom';
import { AuthService } from '../authservice.service';
import { AlertService } from '../alertservice.service';
import { ClassService } from '../class.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
    listStudentsForm :FormGroup;
    loading = false;
    submitted = false;
    classlist :Classroom[] =[];
    selectedClassNumber : string;
      selectedClass: Classroom;

  constructor( private router:Router,
    private authService : AuthService,
    private alertService: AlertService,
    private classService : ClassService,
    private formBuilder: FormBuilder
   ) { }

  ngOnInit() {
  this.listStudentsForm = this.formBuilder.group({
           classNumber: ['', Validators.required]
           });
  
    this.classService.fetchallclasses().subscribe(data => {
            this.classlist = data;
        });
        
  }
  get f() { return this.listStudentsForm.controls; }
   
   onSubmit() {
        this.submitted = true;
        

        // stop here if form is invalid
        if (this.listStudentsForm.invalid) {
            return;
        }
   
        this.loading = true;
         this.selectedClassNumber = this.f.classNumber.value;
         console.log("inside ListStudentsComponent "+  this.selectedClassNumber );
           this.router.navigate(['studentlist', this.selectedClassNumber ]);
        
        
  
  
   

}
}
