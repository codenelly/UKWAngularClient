import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first,map } from 'rxjs/operators';

import {environment} from '../environments/environment';
import {User} from  './user';
import {UserDetails} from './user-details';
import {AuthResponse} from './auth-response';
import { JwtHelperService } from '@auth0/angular-jwt';


 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })

  };
  
  const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userDetailsSubject : BehaviorSubject<UserDetails>;
public currentUserDetails :Observable<UserDetails>;
private userDetails = new UserDetails();



constructor(private httpClient: HttpClient
) { this.userDetailsSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('currentUserDetails')));
this.currentUserDetails = this.userDetailsSubject.asObservable();

 }

 public get currentUserDetailsValue(): UserDetails {
        return this.userDetailsSubject.value;
    }
  
login(username:string, password:string) {
    return this.httpClient.post(environment.ukwServer + "users/login", {username, password})
       .pipe(
       map(data => { 
       if(data && data['accessToken']){
        const decodedToken = helper.decodeToken(data['accessToken']);
        if(decodedToken['role'] &&  data['accessToken'] && decodedToken['username'])
         {     
            this.userDetails.username = decodedToken['username'];
            if(decodedToken['role']=='ROLE_TEACHER')
            this.userDetails.role = 'Teacher';
            else if (decodedToken['role']=='ROLE_PARENT')
            this.userDetails.role = 'Parent';
             else if (decodedToken['role']=='ROLE_ADMIN')
            this.userDetails.role = 'Admin';
            this.userDetails.token = data['accessToken'];
            localStorage.setItem('currentUserDetails',JSON.stringify(this.userDetails ));
            this.userDetailsSubject.next(this.userDetails);
        }
             console.log("inside login authservice"+ data['accessToken'] + "decoded value"+
        decodedToken['role'] +decodedToken['username']);
        
       }
      }));
}

register(user:User) {
   
    let body = JSON.stringify(user);
   
    return this.httpClient.post(environment.ukwServer + "users/registration", user,httpOptions);
    
}

logout() {
  localStorage.removeItem('currentUserDetails');
    this.userDetailsSubject.next(null);
}

public  loggedIn(): boolean{

 return localStorage.getItem('currentUserDetails') !==  null;
}


}
