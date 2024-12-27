package com.qantra.technical_test_2024.services;

import com.qantra.technical_test_2024.entities.Course;
import com.qantra.technical_test_2024.repositories.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class CourseService implements ICourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Path where images will be stored
    private final String uploadDir = "uploads/images/";

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Save course along with image
    public Course createCourse(Course course, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            course.setImageUrl(imageUrl);
        }
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        // Check if the course exists
        Optional<Course> existingCourseOptional = courseRepository.findById(id);

        if (existingCourseOptional.isPresent()) {
            Course existingCourse = existingCourseOptional.get();
            existingCourse.setTitle(courseDetails.getTitle());
            existingCourse.setPrice(courseDetails.getPrice());
            if (courseDetails.getImageUrl() != null && !courseDetails.getImageUrl().isEmpty()) {
                existingCourse.setImageUrl(courseDetails.getImageUrl());
            }
            return courseRepository.save(existingCourse);
        } else {
            return null;
        }
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    private String saveImage(MultipartFile image) throws IOException {
        String imageName = UUID.randomUUID() + "-" + image.getOriginalFilename();
        Path path = Paths.get(uploadDir + imageName);
        Files.createDirectories(path.getParent());
        image.transferTo(path);
        return imageName;
    }
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

}
