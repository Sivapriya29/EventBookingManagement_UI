import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sharedService/auth.service';
import { UsercredentialService } from '../sharedService/usercredential.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  emailId: string = '';
  isLoggedIn = false;
  role: string | null = null;

  constructor(private authService: AuthService,private userService: UsercredentialService, private router:Router) {
    this.role = '';
   }

  ngOnInit(): void {
    this.setUserRoles();
    console.log('ngoninit called inside navbar')
  }

  setUserRoles() {
    this.role = this.authService.getRole();
    console.log(this.role,'--role')
    this.userService.userEmail$.subscribe(userEmail => {
      this.emailId = userEmail;
      console.log(this.emailId,'--emailId')
      if(this.emailId){
      this.isLoggedIn = true;
      }  else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout(): void {
    this.authService.clearRole();
    this.userService.setUserEmail('');
    this.role = null;
    this.router.navigate(['/login'])
  }
 

}
