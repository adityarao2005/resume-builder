package com.resumebuilder.backend.controller;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

    public record SampleResponse(String message) {
    }

    @GetMapping("/sample")
    public Object sample() {
        // Works!!
        SecurityContext context = SecurityContextHolder.getContext();
        System.out.println(context.getAuthentication().getPrincipal());
        System.out.println(context.getAuthentication().getDetails());
        return context.getAuthentication().getPrincipal();
    }
}
