package com.resumebuilder.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfiguration {

    // Configures security settings for the application
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http
                // Authorize HTTP requests where all requests must be authenticated
                .authorizeHttpRequests(authorize -> authorize
                        // TODO: Add security measures to this to prevent unauthorized access
                        .requestMatchers("/ws/**").permitAll()
                        .anyRequest().authenticated())
                // Enable OAuth2 Resource Server with JWT support
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
                // Set session management to stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(c -> c.disable()); // Disable CSRF protection for simplicity
        http.cors(c -> c.configurationSource(request -> null)); // Disable CORS for simplicity
        // Return the configured SecurityFilterChain
        return http.build();
    }
}