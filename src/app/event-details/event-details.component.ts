import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../models/event.model';
import { EventService } from '../sharedService/event.service';
import { AuthService } from '../sharedService/auth.service';
import { Router } from '@angular/router';
import { UsercredentialService } from '../sharedService/usercredential.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit {
  event: Event| null = null;
  error: string = '';
  timeZone = 'UTC'; 
  role: string | null = null;
  emailId: string = '';
  isLoggedIn = false;

  constructor(private route: ActivatedRoute, private eventService: EventService, 
              private authService: AuthService,private router :Router, private userService: UsercredentialService
              ) {
    // this.event = {
    //   id: '1',
    //   name: 'Sample Event',
    //   date: '2024-05-15',
    //   time: '18:00',
    //   location: 'Sample Location',
    //   maxSeats: 100,
    //   pricePerPerson: 10,
    //   description: 'This is a sample event description.'
    // };
  }

  ngOnInit(): void {
    this.loadEvent();
    console.log('ngoninit called inside event-details')
    this.setUserRole();
  }

  loadEvent(): void {
    const eventId = this.route.snapshot.paramMap.get('event_id');
    if(eventId){
    this.eventService.getEventById(eventId).subscribe(
      (event: Event) => {
        this.event = event;
      },
      (error) => {
        this.error = 'Error fetching event details';
        console.error('Error fetching event details:', error);
      }
    );
  }
}

setUserRole(): void {
  this.role = this.authService.getRole();
  console.log(this.role, '--role in event-details');
  this.userService.userEmail$.subscribe(userEmail => {
    this.emailId = userEmail;
    console.log(this.emailId,'--emailId')
      this.isLoggedIn = !!this.emailId;
    // if(this.emailId){
    // this.isLoggedIn = true;
    // }  else {
    //   this.isLoggedIn = false;
    // }
  });
}

bookEvent(): void {
  // Add your logic to book the event here
  console.log('Event booked:', this.event, this.event['id']);
  if(this.event && this.event['id']){
  this.router.navigate(['/bookingForm',this.event['id']])  ///eventDetails/{{event.id}}
  }
}

updateEvent():void {
  this.router.navigate(['/updateEvent',this.event['id']])
}

deleteEvent(eventId: string): void {
  this.eventService.deleteEvent(eventId).subscribe(
    ()=>{
      alert("Event deleted successfully")
  if(this.role === "admin"){
  this.router.navigate(['/adminhome'])
  } else {
    this.router.navigate(['/adminhome'])
  }
    },
    (error) => {
      console.error('Error cancelling booking:', error);
      alert('Cancellation failed. Please try again.');
    }
  );
}

addFeedback(){
  this.router.navigate(['/feedbackForm',this.event['id']])
}

}
