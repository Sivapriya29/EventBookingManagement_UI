import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/sharedService/feedback.service';
import { AuthService } from 'src/app/sharedService/auth.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-all-feedback-list',
  templateUrl: './all-feedback-list.component.html',
  styleUrls: ['./all-feedback-list.component.css']
})
export class AllFeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  userId: string = '';

  constructor(private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserFeedbacks();
  }

  loadUserFeedbacks(): void {
    // this.authService.getUserIdFromToken().subscribe(
    //   (userId: string) => {
    //     this.userId = userId;
        this.feedbackService.getAllFeedbacks().subscribe(
          (feedbacks: Feedback[]) => {
            this.feedbacks = feedbacks;
          },
          (error) => {
            console.error('Error fetching feedbacks:', error);
          }
        );
    //   },
    //   (error) => {
    //     console.error('Error getting user ID:', error);
    //   }
    // );
  }

}
