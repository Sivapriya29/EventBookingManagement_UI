import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsercredentialService {
  private userEmailSource = new BehaviorSubject<string>(localStorage.getItem('userEmail') || '');
  userEmail$ = this.userEmailSource.asObservable();

  constructor() { }
  setUserEmail(userEmail: string): void {
    this.userEmailSource.next(userEmail)
    console.log(localStorage.setItem('userEmail', userEmail))
    localStorage.setItem('userEmail', userEmail);
  }
}
