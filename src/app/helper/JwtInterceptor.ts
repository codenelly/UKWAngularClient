import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../authservice.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserDetailsValue;
        if (currentUser && currentUser.token) {
        
            request = request.clone({
                setHeaders: { 
                    'Authorization' : `Bearer ${currentUser.token}`,
                        'Content-Type':  'application/json'
                   
                }
            });
            
            console.log("inside =>JwtInterceptor" + request + JSON.stringify(request));
            
        }

        return next.handle(request);
    }
}