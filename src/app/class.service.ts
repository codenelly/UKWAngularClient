import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';
import { Classroom} from './classroom';
import { User} from './user';
import { first,map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClassService {
user : User;


  constructor(private httpClient: HttpClient) { }
  
  createClass(classroom:Classroom) {
  console.log("inside createClass"+classroom);
   
    let body = JSON.stringify(classroom);
        
   
    return this.httpClient.post(environment.ukwServer + "classes/", classroom);
    
}

    fetchallTeachers() {

   return this.httpClient.get<User[]>(environment.ukwServer + "users/allTeachers/");
    
}

fetchallclasses(){
return this.httpClient.get<Classroom[]>(environment.ukwServer + "classes/");

}
}
