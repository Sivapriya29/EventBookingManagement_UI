import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../sharedService/event.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
// event : Event;
events: Event[] = [];
timeZone = 'UTC'; 

  constructor(private route: ActivatedRoute, private eventService: EventService) { 
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
