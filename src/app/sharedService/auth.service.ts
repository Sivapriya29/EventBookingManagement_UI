import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { loginAuthData, signupAuthData } from '../models/auth-data.model';
// import * as jwt_decode from 'jwt-decode';
// import * as jwt_decode from 'jwt-decode';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3800/v1'
  private isLoggedIn = false;
  private role: string | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  checkLoginCredentials(email:string, password: string, role:string): Observable<any>{
    const authData : loginAuthData = {email: email, password: password,role: role}
    console.log(this.http.post(`${this.apiUrl}`,authData))
    // return this.http.post(`${this.apiUrl}/login`,authData)
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password, role })
      .pipe(
        map(response => {
          if (response.token) {
            // localStorage.setItem('token', response.token);
            this.setToken(response.token);
          }
          return response;
        })
      );
  }

  getToken(): string {
    return localStorage.getItem('token');
    // return this.token;
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserIdFromToken(): Observable<any> {
     const token = this.getToken();
    // console.log(token,'--token')
    // if (token) {
    //   try {
    //     const decoded: any = jwtDecode(token);
    //     console.log(decoded,'decoded')
    //     return decoded.user_id; // Adjust based on your token's structure
    //   } catch (error) {
    //     console.error('Error decoding token:', error);
    //     return null;
    //   }
    // }
    // return null;
    if (!token) {
      throw new Error('Token not found');
    }
    console.log(this.http.get<any>(`${this.apiUrl}/users`, { headers: { Authorization: `Bearer ${token}` } }))
    return this.http.get<any>(`${this.apiUrl}/users`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map(response => response.id) // Assuming the response contains user_id field
    );
  }

  checkSignupCredentials(first_name: string,last_name: string, email: string, mobile: number, password: string, role:string): Observable<any>{
    const authData: signupAuthData = {first_name: first_name,last_name:last_name,email:email,mobile: mobile,password:password,role:role}
    return this.http.post(`${this.apiUrl}/register`,authData)
  }

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): string | null {
    console.log(localStorage.getItem('userRole'))
    return this.role || localStorage.getItem('userRole');
  }

  clearRole(): void {
    this.role = null;
    localStorage.removeItem('userRole');
  }

  /*checkLoginCredentials(emailId: string, password: string):boolean{
    const validEmailId = "siva";
    const validPassword = "siva";
    if(emailId === validEmailId && password === password) {
      return true
    } else {
      return false
    }
  }

  checkSignupCredentials(username: string,emailId: string, phoneNumber: number,password: string, confirmPassword: string):boolean{
    if(username != "" && emailId != null && phoneNumber != null && password !="" && confirmPassword != "") {
      return true
    } else {
      return false
    }
  }*/
 
}
