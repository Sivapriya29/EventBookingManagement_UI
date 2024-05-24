import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/sharedService/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/sharedService/auth.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  userId: string = '';

  constructor(private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserFeedbacks();
  }

  loadUserFeedbacks(): void {
    this.authService.getUserIdFromToken().subscribe(
      (userId: string) => {
        this.userId = userId;
        this.feedbackService.getFeedbackByUser(this.userId).subscribe(
          (feedbacks: Feedback[]) => {
            this.feedbacks = feedbacks;
          },
          (error) => {
            console.error('Error fetching feedbacks:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting user ID:', error);
      }
    );
  }

}
