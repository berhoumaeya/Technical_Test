import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  implements OnInit {

  courses: any[] = [];

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.apiService.getCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }
}