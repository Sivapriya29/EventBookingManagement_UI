import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingFormComponent } from '../user/booking-form/booking-form.component';
import { Booking } from '../models/booking.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3800/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // bookTickets(bookingData: BookingFormComponent): Observable<BookingFormComponent> {
  //   return this.http.post<BookingFormComponent>(this.apiUrl, bookingData);
  // }
  // bookTickets(eventId: string, numberOfTickets: number, totalAmount: number, userId: string): Observable<any>{
  //   const booking = {
  //     event_id: eventId,
  //     user_id: userId,
  //     number_of_tickets: numberOfTickets,
  //     total_amount: totalAmount
  //   };
  //   return this.http.post<any>(`${this.apiUrl}`, booking);
  // }
  bookTickets(bookingDetails: any): Observable<any> {
    const token = this.authService.getToken();
    return this.http.post(`${this.apiUrl}/bookings`, bookingDetails,{ headers: { Authorization: `Bearer ${token}` } });
  }

  getBookingsByEventId(eventId: string): Observable<BookingFormComponent[]> {
    return this.http.get<BookingFormComponent[]>(`${this.apiUrl}?eventId=${eventId}`);
  }

  getBookingsById(bookingId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  getUserBookings(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}/bookings`);
  }

  cancelBooking(bookingId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${bookingId}`);
  }
}
