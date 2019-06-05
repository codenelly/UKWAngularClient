import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Roles } from '../roles.enum';
import { AuthService } from '../authservice.service';
import { AlertService } from '../alertservice.service';
import { User} from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    user = new User();
    roles = ['teacher','parent','admin'];
    roleArr :string[];

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService,
    private alertService: AlertService
   ) 
    {
    }

  ngOnInit() {
  this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            email:  ['',[Validators.required, Validators.email]],
            role:['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.registerForm.controls; }
  
  onSubmit() {
        this.submitted = true;
        

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log("role" +this.f.role.value +this.authService);
        this.loading = true;
        this.roleArr = [this.f.role.value];
        this.user.firstName = this.f.firstName.value;
        this.user.lastName = this.f.lastName.value;
        this.user.userName = this.f.userName.value;
        this.user.email = this.f.email.value;
        this.user.roles = [this.f.role.value];
        this.user.password = this.f.password.value;
        this.authService.register(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful!. Please Login to continue', true);
                    console.log("inside registarion component "+ "sucess");
                    this.router.navigate(['/login']);
                },
                error => {
                 console.log("inside registration component "+ error );
                    this.alertService.error(error);
                    this.loading = false;
                });
                
             this.clearForm();  
    }
    clearForm() {

this.registerForm.reset({
      'firstName': '',
      'lastName': '',
      'userName': '',
      'address': '',
      'email': '',
      'role': '',
      'country': '',
       'password': ''
     });
   
     this.registerForm.markAsPristine();
     
}

}
