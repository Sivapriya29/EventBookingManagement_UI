import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/sharedService/auth.service';
import { FeedbackService } from 'src/app/sharedService/feedback.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  event_id: string;
  user_id: string;

  constructor(private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
      this.feedbackForm = this.formBuilder.group({
        rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        comments: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.event_id = params.get('event_id') || '';
    });

    this.authService.getUserIdFromToken().subscribe(
      (userId: string) => {
        this.user_id = userId;
      },
      (error) => {
        console.error('Error getting user ID:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedback = {
        id: '',
        user_id: this.user_id,
        event_id: this.event_id,
        rating: this.feedbackForm.get('rating')?.value,
        comments: this.feedbackForm.get('comments')?.value
      };

      this.feedbackService.addFeedback(feedback).subscribe(
        () => {
          alert('Feedback submitted successfully!');
          this.feedbackForm.reset();
          this.router.navigate(['/eventDetails',this.event_id]); // Redirect to events page after submission
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          alert('Feedback submission failed. Please try again.');
        }
      );
    }
  }

}
