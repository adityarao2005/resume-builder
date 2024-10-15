package com.resumebuilder.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfiguration {

        // Configures security settings for the application
        protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
                http
                                // Authorize HTTP requests where all requests must be authenticated
                                .authorizeHttpRequests(authorize -> authorize
                                                .anyRequest().authenticated())
                                // Enable OAuth2 Resource Server with JWT support
                                .oauth2ResourceServer((oauth2) -> oauth2
                                                .jwt(Customizer.withDefaults()))
                                // Set session management to stateless
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .csrf(c -> c.disable())
                                // Disable CSRF protection for simplicity
                                .cors(c -> c.configurationSource(request -> null));
                // Disable CORS for simplicity

                // Return the configured SecurityFilterChain
                return http.build();
        }

        @Bean
        DefaultBearerTokenResolver bearerTokenResolver() {
                DefaultBearerTokenResolver resolver = new DefaultBearerTokenResolver();
                resolver.setAllowUriQueryParameter(true);
                return resolver;
        }
}