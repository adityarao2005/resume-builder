package com.resumebuilder.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfiguration {

    // Configures security settings for the application
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http
                // Authorize HTTP requests where all requests must be authenticated
                .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
                // Enable OAuth2 Resource Server with JWT support
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));
        // Return the configured SecurityFilterChain
        return http.build();
    }
}