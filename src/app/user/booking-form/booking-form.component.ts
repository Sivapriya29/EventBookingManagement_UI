import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/sharedService/booking.service';
import { EventService } from 'src/app/sharedService/event.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sharedService/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  submitted = false;
  event: any;
  userEmail: string = '';
  event_id: string;
  number_of_tickets: number;
  total_amount: number;
  price_per_person: number = 0;
  userID: string;

  constructor(private formBuilder: FormBuilder, private bookingService: BookingService, 
    private eventService: EventService, private router: Router, private authService: AuthService,
    private route: ActivatedRoute) { 
      this.bookingForm = this.formBuilder.group({
        event_id: [{ value: '', disabled: true }, Validators.required],
        number_of_tickets: ['', [Validators.required, Validators.min(1)]],
        total_amount: [{ value: '', disabled: true }, Validators.required]
      });
    }

  ngOnInit(): void {
    this.loadEventDetails();
  }

  loadEventDetails(): void {
    this.route.paramMap.subscribe(params => {
      this.event_id = params.get('event_id') || '';
      if (this.event_id) {
        this.eventService.getEventById(this.event_id).subscribe(
          (event: any) => {
            this.event = event;
            this.price_per_person = event.per_person_price;
            this.bookingForm.patchValue({
              event_id: this.event_id,
              total_amount: 0
            });
          },
          (error) => {
            console.error('Error fetching event details:', error);
          }
        );
      }
    });
  }

  calculateTotalAmount(): void {
    const numberOfTickets = this.bookingForm.get('number_of_tickets')?.value || 0;
    const totalAmount = numberOfTickets * this.price_per_person;
    this.bookingForm.patchValue({
      total_amount: totalAmount
    });
  }

 /* onSubmit(): void {
    if (this.bookingForm.valid) {
      // const userId = this.authService.getUserIdFromToken();
      const userId = this.authService.getUserIdFromToken().subscribe(
        (userId: string) => {
          // Use userId here
          console.log(userId)
          this.userID = userId
        },
        (error) => {
          console.error('Error getting user_id:', error);
        }
      );
      console.log(this.userID)
      // Call the booking service to submit the booking
      if (this.userID) {
        const bookingDetails = {
          event_id: this.event_id,
          number_of_tickets: this.bookingForm.get('number_of_tickets')?.value,
          total_amount: this.bookingForm.get('total_amount')?.value,
          user_id: this.userID
        };
      this.bookingService.bookTickets(bookingDetails).subscribe(
        () => {
          // Handle successful booking
          alert('Booking successful!');
          this.bookingForm.reset();
        },
        (error) => {
          console.error('Error during booking:', error);
          alert('Booking failed. Please try again.');
        }
      );
    }  else {
      console.error('User not authenticated');
    }
    }
  }*/

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.authService.getUserIdFromToken().subscribe(
        (userId: string) => {
          if (userId) {
            const bookingDetails = {
              event_id: this.event_id,
              no_of_tickets: this.bookingForm.get('number_of_tickets')?.value,
              total_amount: this.bookingForm.get('total_amount')?.value,
              user_id: userId
            };
            this.bookingService.bookTickets(bookingDetails).subscribe(
              () => {
                // Handle successful booking
                alert('Booking successful!');
                this.bookingForm.reset();
              },
              (error) => {
                console.error('Error during booking:', error);
                alert('Booking failed. Please try again.');
              }
            );
          } else {
            console.error('User not authenticated');
          }
        },
        (error) => {
          console.error('Error getting user_id:', error);
          alert('Error getting user_id. Please try again.');
        }
      );
    } else {
     alert('form is invalid')
    }
  }
  
}
