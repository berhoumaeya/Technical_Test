import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  course: any = {
    title: '',
    price: null,
  };

  selectedImage: File | null = null;
  imageTouched: boolean = false;
  successMessage: string | null = null;  // Success message variable

  constructor(private courseService: ApiService) {}

  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
    this.imageTouched = true;
  }

  createCourse(courseForm: any) {
    if (!this.selectedImage) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.course.title);
    formData.append('price', this.course.price.toString());
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.courseService.createCourse(formData).subscribe(
      (response) => {
        console.log('Course created successfully:', response);
        
        // Set success message after course is created
        this.successMessage = 'Course created successfully!';

        // Reset form after creation and clear validation states
        courseForm.resetForm();  // Reset the form state (clears validation errors)
        
        // Optionally, clear the success message after a few seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);  // Hide success message after 5 seconds

        // Reset the course data and selected image
        this.course = { title: '', price: null };
        this.selectedImage = null;
        this.imageTouched = false;
      },
      (error) => {
        console.error('Error while creating course:', error);
      }
    );
  }
}
