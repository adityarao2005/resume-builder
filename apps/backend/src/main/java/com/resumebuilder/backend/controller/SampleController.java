package com.resumebuilder.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

    @GetMapping("/sample")
    public String sample() {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        Jwt jwt = (Jwt) auth.getPrincipal();

        // TODO: Use the "sub" or the "user_id" claim for the id of the user when saving to database
        System.err.println(auth);
        System.err.println(jwt.getClaims());
        System.err.println(auth.getName());
        return "Hello, World!";
    }
}
