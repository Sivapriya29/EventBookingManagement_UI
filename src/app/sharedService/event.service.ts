import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3800/v1/events';

  constructor(private http: HttpClient,private authService: AuthService) { }
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  createEvent(eventData: Event): Observable<Event> {
    const token = this.authService.getToken();
    console.log(token,'==token')
    return this.http.post<Event>(this.apiUrl, eventData,{ headers: { Authorization: `Bearer ${token}` } });
  }

  updateEvent(eventId: string, eventData: Event): Observable<Event> {
    const token = this.authService.getToken();
    console.log(token,'==token')
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, eventData,{ headers: { Authorization: `Bearer ${token}` } });
  }

  deleteEvent(eventId: string): Observable<void> {
    const token = this.authService.getToken();
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`,{ headers: { Authorization: `Bearer ${token}` } });
  }
}
