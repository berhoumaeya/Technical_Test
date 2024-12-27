package com.qantra.technical_test_2024.repositories;

import com.qantra.technical_test_2024.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
