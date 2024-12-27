import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  courses: any[] = [];

  selectedCourse: any;


  constructor(private courseService: ApiService) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }
  onEditCourse(course: any) {
    this.selectedCourse = course;
  }
  deleteCourse(courseId: any) {
    const id: number = +courseId;

    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(
        () => {
          this.fetchCourses();
        },
        (error) => {
          console.error('Error deleting course', error);
        }
      );
    }
  }

}