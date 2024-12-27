import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseId: number | null = null;
  course: any = {
    title: '',
    price: null,
    imageUrl: ''
  };
  isUpdating = false;
  updateError: string | null = null; // To store error message if course update fails
  updateSuccess: string | null = null; // To store success message after update

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: ApiService
  ) {}

  ngOnInit(): void {
    // Get the course ID from the URL
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('id')!;
      if (this.courseId) {
        this.getCourseDetails(this.courseId);
      }
    });
  }

  getCourseDetails(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe(
      (response) => {
        this.course = response; // Assuming the response is the course data
      },
      (error) => {
        console.error('Error fetching course data', error);
        this.updateError = 'Failed to load course details.';
      }
    );
  }

  updateCourse() {
    if (this.courseId !== null) {
      this.isUpdating = true;
      const courseData = {
        title: this.course.title,
        price: this.course.price,
        imageUrl: this.course.imageUrl // Assuming you're not updating the image
      };

      this.courseService.updateCourse(this.courseId, courseData).subscribe(
        (response) => {
          console.log('Course updated successfully:', response);
          this.updateSuccess = 'Course updated successfully!';
          this.updateError = null; // Clear any previous error messages
          this.isUpdating = false;
          // Optionally, navigate to another page or reset the form
          this.router.navigate(['/admin-dashboard']);
        },
        (error) => {
          console.error('Error updating course:', error);
          this.isUpdating = false;
          this.updateError = 'Failed to update course. Please try again.';
          this.updateSuccess = null; // Clear any previous success messages
        }
      );
    }
  }
}
