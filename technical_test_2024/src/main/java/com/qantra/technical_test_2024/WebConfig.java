package com.qantra.technical_test_2024;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map the /images/** URL to the uploads/images/ directory on the filesystem
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/images/");
    }
}