import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './guards/auth.guard';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { BookingFormComponent } from './user/booking-form/booking-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { UpdateEventComponent } from './admin/update-event/update-event.component';
import { BookingListComponent } from './admin/booking-list/booking-list.component';
import { FeedbackFormComponent } from './user/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './user/feedback-list/feedback-list.component';
import { AllFeedbackListComponent } from './admin/all-feedback-list/all-feedback-list.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'addEvent', component: AddEventComponent},
  {path: 'adminhome', component: AdminHomeComponent},
  {path: 'bookingForm/:event_id', component: BookingFormComponent},
  {path: 'eventDetails/:event_id', component: EventDetailsComponent},
  {path: 'bookingDetails', component: BookingDetailsComponent},
  {path: 'updateEvent/:event_id', component: UpdateEventComponent},
  {path: 'bookingList', component: BookingListComponent},
  {path: 'feedbackForm/:event_id', component: FeedbackFormComponent},
  {path: 'feedbackList', component: FeedbackListComponent},
  {path: 'allFeedbacksList', component: AllFeedbackListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
