import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/sharedService/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventForm: FormGroup;
  submitted = false;
  eventId: string;
  event: Event;

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.eventForm = this.formBuilder.group({
        event_name: ['', Validators.required],
        event_description: ['', Validators.required],
        location: ['', Validators.required],
        event_date: ['', Validators.required],
        per_person_price: ['', [Validators.required, Validators.min(0)]],
      });
    }

  ngOnInit(): void {
      this.loadEventDetails();
  }

  loadEventDetails(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('event_id') || '';
    this.eventService.getEventById(this.eventId).subscribe(
      (event: Event) => {
        this.event = event;
        this.eventForm.patchValue(event);
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.eventForm.invalid) {
      return;
    }
    const eventDate = new Date(this.eventForm.value.event_date).toISOString();
    const newEvent = {
      event_name: this.eventForm.value.event_name,
      event_date: eventDate,
      location: this.eventForm.value.location,
      per_person_price: this.eventForm.value.per_person_price,
      event_description: this.eventForm.value.event_description,
    };

    const updatedEvent = {
      ...this.event,
      ...newEvent
    };

    this.eventService.updateEvent(this.eventId, updatedEvent).subscribe(
      () => {
        alert('Event updated successfully!');
        this.router.navigate(['/adminhome']);
      },
      (error) => {
        console.error('Error updating event:', error);
        alert('Update failed. Please try again.');
      }
    );
  }

}
