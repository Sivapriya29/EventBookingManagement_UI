import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../sharedService/auth.service';
import { UsercredentialService } from '../sharedService/usercredential.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  email: string = '';
  password: string = '';
  error: string = '';
  role: string;

  constructor(private router: Router,private authService: AuthService,private userService: UsercredentialService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      role: ['',[Validators.required]]
    })
   }

   get formControls() {
    return this.loginForm.controls;
   }

  ngOnInit(): void {
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const { email, password, role } = this.loginForm.value;
    // const role = this.loginForm.value.role;
    // if(this.authService.checkLoginCredentials(this.emailId,this.password)) {
    //   console.log(this.emailId,'--emailId')

    //   if(this.emailId === "siva" && this.password === "siva") {
    //     this.userService.setUsername(this.emailId);
    //     this.router.navigate(['/adminhome'])
    //   } else {
    //     this.router.navigate(['/login'])
    //   }
    // } else {
    //   this.emailId = ""
    //   this.password = ""
    //   alert('Invalid email or password')
    // }
    this.authService.checkLoginCredentials(email, password, role)
    .subscribe(
      (response) => {
        // Successful login, navigate to next page
        this.authService.setRole(role);
        this.userService.setUserEmail(email);
        alert('Login successful!')
        const token = response.token;
        console.log(token,'token in login') // Assuming the response contains the token
        this.authService.setToken(token);
        // Use the token to fetch user ID
        // this.authService.getUserIdFromToken().subscribe(
        //   (user) => {
        //     const userId = user.user_id; // Assuming the response contains user_id
        //     // Store the user ID in your Angular application state
        //     // For example, you can store it in local storage
        //     localStorage.setItem('user_id', userId);
        //     // Optionally, redirect the user to another page
        //     // Replace '/dashboard' with your desired route
        //     // this.router.navigate(['/dashboard']);
        //   },
        //   (error) => {
        //     console.error('Error fetching user ID:', error);
        //   }
        // );
        
        this.router.navigate(['/adminhome']);
      },
      (error) => {
        // Handle login error
        this.error = 'Invalid username or password';
        console.log(error.error['error'])
        alert("login failed")
      }
    );
}
    

}
