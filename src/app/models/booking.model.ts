import { Timestamp } from "rxjs";

export interface Booking {
    booking_id: string;
    event_id: string;
    event_name: string;
    user_id: string;
    no_of_tickets: number;
    total_amount: number;
    created_at: Date;
  }
