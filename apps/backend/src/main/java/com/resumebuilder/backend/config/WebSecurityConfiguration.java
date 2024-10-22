package com.resumebuilder.backend.config;

import org.springframework.boot.web.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class WebSecurityConfiguration {

        // Configures security settings for the application
        protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
                http
                                // Authorize HTTP requests where all requests must be authenticated
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                .anyRequest().authenticated())
                                // Enable OAuth2 Resource Server with JWT support
                                .oauth2ResourceServer((oauth2) -> oauth2
                                                .jwt(Customizer.withDefaults()))
                                // Set session management to stateless
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .csrf(c -> c.disable())
                                // Disable CSRF protection for simplicity
                                .cors(c -> c.configurationSource(corsConfigurationSource()));
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

        // Define the CORS configuration
        private CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.addAllowedOrigin("http://localhost:3000"); // Adjust the allowed origin
                configuration.addAllowedMethod("*"); // Allow all HTTP methods
                configuration.addAllowedHeader("*"); // Allow all headers
                configuration.setAllowCredentials(true);
                configuration.addExposedHeader("Authorization");

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration); // Apply CORS settings to all endpoints
                return source;
        }
}