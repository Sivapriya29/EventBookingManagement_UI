import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3800/v1';

  constructor(private http: HttpClient) { }
  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/feedbacks`, feedback);
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedbacks`);
  }

  getFeedbackByEvent(event_id: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}?event_id=${event_id}`);
  }

  getFeedbackByUser(user_id: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${user_id}/feedbacks`);
  }
}
