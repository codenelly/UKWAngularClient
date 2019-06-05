import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../authservice.service';
import { Router } from '@angular/router';
import { AlertService } from '../alertservice.service';

@Injectable()
export class ReqErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,private router : Router,private alertService : AlertService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                if(this.authenticationService.currentUserDetailsValue){
                 window.alert("Unauthenticated:Your session is expired-Please sign in ");
              
                this.authenticationService.logout();
              
                this.router.navigateByUrl('/login');
               
                
                location.reload(false);
                }
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
