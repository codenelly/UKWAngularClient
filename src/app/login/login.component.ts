import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../authservice.service';
import { AlertService } from '../alertservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 loading = false;
 submitted = false;
 returnUrl :String;
 
 
  constructor(private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private authenticationService: AuthService,
  private alertService: AlertService) {
   if (this.authenticationService.currentUserDetailsValue) { 
            this.router.navigate(['/']);
  }
  }

  ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get formctrl() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.formctrl.username.value, this.formctrl.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error('Invalid Username and/or Password. If not registerd please Sign up', true);
                   this.loading = false;
                });
                
                
    }

}
