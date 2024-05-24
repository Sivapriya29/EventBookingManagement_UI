import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/sharedService/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  events: Event[] = [];
  timeZone = 'UTC'; 

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  getImageForEventType(eventType: string): string {
    switch(eventType) {
      case 'Workshop':
        return 'assets/images/workshop.jpg';
      case 'Concerts':
        return 'assets/images/concert.jpg';
      case 'Seminar':
        return 'assets/images/seminar.jpg';
      case 'Conferences':
        return 'assets/images/conferences.jpg';
      default:
        return 'assets/images/default.png';
    }
  }

}
