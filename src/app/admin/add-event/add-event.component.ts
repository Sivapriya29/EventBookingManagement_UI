import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/sharedService/event.service';
import {Event } from 'src/app/models/event.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sharedService/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventName: string = '';
  eventForm: FormGroup;
  role: string | null = null;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router,private authService : AuthService) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', Validators.required],
      event_time: ['', Validators.required],
      event_type: ['', Validators.required],
      location: ['', Validators.required],
      speaker_name: ['', Validators.required],
      organizer_name: ['', Validators.required],
      event_description: ['', Validators.required],
      capacity: [0, [Validators.required,Validators.min(1)]],
      per_person_price: [0, [Validators.required,Validators.min(0)]],

    });
    console.log('ngoninit called inside add-event')
  }
  cities: any[] = [
    { label: 'New York', value: 'New York' },
    { label: 'London', value: 'London' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Tokyo', value: 'Tokyo' }
  ];

  selectedCity: string = ''; // To store selected city

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }
    const formData = this.eventForm.value;

    // Convert date to the required format
    const eventDate = new Date(formData.event_date).toISOString();
    const eventTime = new Date(formData.event_time).toISOString();

    const newEvent: Event = {
      event_id: '',
      event_name: formData.event_name,
      event_date: eventDate,
      event_time: eventTime,
      location: formData.location,
      capacity: formData.capacity,
      per_person_price: formData.per_person_price,
      event_description: formData.event_description,
      event_type: formData.event_type,
      speaker_name: formData.speaker_name,
      organizer_name: formData.organizer_name,
      created_at: new Date().toISOString(),
    };

    //if (this.eventForm.valid) {
      // Call the event service to create the event
      this.eventService.createEvent(newEvent).subscribe(
        (event) => {
          // Handle successful event creation
          alert('Event created successfully!');
          this.role = this.authService.getRole();
          if(this.role === "admin"){
          this.router.navigate(['/adminhome'])
          } else {
            this.router.navigate(['/'])
          }
          // this.eventForm.reset();
        },
        (error) => {
          console.error('Error during event creation:', error);
          alert('Event creation failed. Please try again.');
        },
        () => {
          
        }
      );
    //}
  }

}
