import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DropdownDirective } from './dropdown.directive';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingFormComponent } from './user/booking-form/booking-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { UpdateEventComponent } from './admin/update-event/update-event.component';
import { BookingListComponent } from './admin/booking-list/booking-list.component';
import { FeedbackFormComponent } from './user/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './user/feedback-list/feedback-list.component';
import { AllFeedbackListComponent } from './admin/all-feedback-list/all-feedback-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomepageComponent,
    SignupComponent,
    AdminHomeComponent,
    DropdownDirective,
    AddEventComponent,
    BookingFormComponent,
    EventDetailsComponent,
    BookingDetailsComponent,
    UpdateEventComponent,
    BookingListComponent,
    FeedbackFormComponent,
    FeedbackListComponent,
    AllFeedbackListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
