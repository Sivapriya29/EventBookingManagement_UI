import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sharedService/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted=false;

  first_name: string;
  last_name: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
  role: string;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      mobile: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required]],
      role:['',[Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    }
  )
   }
   get formControls() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl) => {
      const passControl = formGroup.get(password);
      const confirmPassControl = formGroup.get(confirmPassword);

      if (confirmPassControl?.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl?.value !== confirmPassControl?.value) {
        confirmPassControl?.setErrors({ mustMatch: true });
      } else {
        confirmPassControl?.setErrors(null);
      }
    };
  }

  signUp(){

    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.authService.checkSignupCredentials(this.first_name,this.last_name,this.email,this.mobile,this.password,this.role).subscribe(
      response => {
        console.log('Signup successful',response)
         alert("Signup successful")
        this.router.navigate(['/login']);
      },
      error => {
        console.log('sigup failed',error)
         alert("Signup failed")
      }
    );
  }

  // signUp() {
  //   if(this,this.authService.checkSignupCredentials(this.username,this.emailId,this.phoneNumber,this.password,this.confirmPassword)) {
  //     this.router.navigate(['/login']);
  //   } else {
  //     alert('Signup failed')
  //   }
  // }

}
