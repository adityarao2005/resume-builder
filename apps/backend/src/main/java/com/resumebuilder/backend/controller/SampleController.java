package com.resumebuilder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.service.IdentityService;

@RestController
public class SampleController {
    @Autowired
    private IdentityService identityService;

    @GetMapping("/sample")
    public String sample() {
        // to database
        System.err.println(SecurityContextHolder.getContext().getAuthentication());
        System.err.println(identityService.getUserId());
        return "Hello, World!";
    }
}
