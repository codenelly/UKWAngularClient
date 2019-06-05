import { Component, OnInit,Input } from '@angular/core';
import { Classroom } from '../classroom';
import { AuthService } from '../authservice.service';
import { AlertService } from '../alertservice.service';
import {Studentdetail } from '../studentdetail';

import {Router ,ActivatedRoute} from '@angular/router';

import {StudentService} from '../student.service';

@Component({
  selector: 'app-list-students-display',
  templateUrl: './list-students-display.component.html',
  styleUrls: ['./list-students-display.component.css']
})
export class ListStudentsDisplayComponent implements OnInit {
  @Input() selectedclass: Classroom;
  classNumber :string;
  studentlist :Studentdetail[] = [];
   
  constructor(private router:ActivatedRoute,
    private authService : AuthService,
    private alertService: AlertService,
    private studentService : StudentService) {
    this.router.params.subscribe(params => {
     
      if (params['classNumber']) { 
        this.classNumber = params['classNumber'];
         console.log("classNumber"+ this.classNumber);
      }});
      }

  ngOnInit() {
 
  this.studentService.fetchAllStudents(this.classNumber).subscribe(data => {
            this.studentlist = data;
           
        });
  
  }

}
