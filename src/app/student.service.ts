import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {environment} from '../environments/environment';

import { Student} from './student';
import {Studentdetail } from './studentdetail';
import { Classroom } from './classroom';
import { first,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {student : Student;


  constructor(private httpClient: HttpClient) { }
  
  createStudent(student:Student) {
  console.log("inside createStudent"+student);
 
        
   
    return this.httpClient.post(environment.ukwServer + "students/", student);
    
}

fetchAllStudents(classnumber:string) {
  console.log("inside fetchAllStudents"+classnumber);
 
        let params = new HttpParams().set('classnumber', classnumber);
   
    return this.httpClient.get<Studentdetail[]>(environment.ukwServer + "students/class", { params: params});
    
}


   
}
