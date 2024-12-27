package com.qantra.technical_test_2024.controlleurs;

import com.qantra.technical_test_2024.entities.Course;
import com.qantra.technical_test_2024.services.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Operation(summary = "Récupérer tous les Courses")
    @GetMapping
    public List<Course> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        for (Course course : courses) {
            course.setImageUrl(course.getImageUrl().replace("uploads/", "images/"));
        }
        return courses;
    }
    @Operation(summary = "Get une Course")
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        if (course != null) {
            return new ResponseEntity<>(course, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Ajouter une Course")
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestParam("title") String title,
                                               @RequestParam("price") Double price,
                                               @RequestParam("image") MultipartFile image) {
        try {
            Course course = new Course();
            course.setTitle(title);
            course.setPrice(price);

            course = courseService.createCourse(course, image);

            return new ResponseEntity<>(course, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Operation(summary = "Modifier une Course")
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course updatedCourse = courseService.updateCourse(id, courseDetails);
        if (updatedCourse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCourse);
    }


    @Operation(summary = "Supprimer une Course")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Récupérer l'image d'un Course")
    @GetMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get("uploads/images/").resolve(imageName);
            if (Files.exists(imagePath)) {
                byte[] image = Files.readAllBytes(imagePath);
                String contentType = Files.probeContentType(imagePath);
                return ResponseEntity.ok()
                        .header("Content-Type", contentType != null ? contentType : "image/jpeg")
                        .body(image);
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
