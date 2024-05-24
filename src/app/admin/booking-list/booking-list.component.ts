import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/sharedService/booking.service';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  constructor( private bookingService: BookingService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }


}
