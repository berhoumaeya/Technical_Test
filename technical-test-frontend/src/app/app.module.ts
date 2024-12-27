import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AddCourseComponent,
    AdminDashboardComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
