import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:8089/test/api';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses`);
  }

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses`, courseData);
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/courses/${courseId}`, course);
  }
  
  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/courses/${courseId}`);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}`);
  }
}
