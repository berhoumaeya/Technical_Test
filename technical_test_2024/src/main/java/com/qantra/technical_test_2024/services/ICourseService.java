package com.qantra.technical_test_2024.services;

import com.qantra.technical_test_2024.entities.Course;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICourseService {
    List<Course> getAllCourses();

    Course createCourse(Course course, MultipartFile image) throws IOException;

     Course updateCourse(Long id, Course courseDetails);
    void deleteCourse(Long id);
    Course getCourseById(Long id);

}
