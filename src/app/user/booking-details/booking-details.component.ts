import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/sharedService/booking.service';
import { AuthService } from 'src/app/sharedService/auth.service';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  bookings: Booking[]=[];
  userId: string;
  bookingID: string;

  constructor(private bookingService: BookingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserBookings();
  }

  loadUserBookings(): void {
    this.authService.getUserIdFromToken().subscribe(
      (userId: string) => {
        this.userId = userId;
        this.bookingService.getUserBookings(this.userId).subscribe(
          (bookings: Booking[]) => {
            this.bookings = bookings
            console.log(this.bookings)
          },
          (error) => {
            console.error('Error fetching bookings:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting user_id:', error);
      }
    );
  }
  cancelBooking(bookingId: string): void {
    this.bookingService.cancelBooking(bookingId).subscribe(
      () => {
        alert('Booking cancelled successfully!');
        this.loadUserBookings();
      },
      (error) => {
        console.error('Error cancelling booking:', error);
        alert('Cancellation failed. Please try again.');
      }
    );
  }

}
