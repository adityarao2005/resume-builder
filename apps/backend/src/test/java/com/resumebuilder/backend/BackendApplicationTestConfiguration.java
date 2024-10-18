package com.resumebuilder.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

@TestConfiguration
public class BackendApplicationTestConfiguration {

    @Autowired
    private TestRestTemplate restTemplate;

    // Identity record
    public static record Identity(@JsonProperty("idToken") String idToken, @JsonProperty("localId") String localId) {
    }

    @Bean
    public Identity getIdentity() throws Exception {
        // URL to sign in with email and password
        String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

        // Request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Request body
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper
                .writeValueAsString(new SignInRequest("bb10bb@gmail.com", "bb10bb", true));

        // Send request
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Parse response
        ResponseEntity<Identity> response = restTemplate.exchange(
                UriComponentsBuilder.fromUriString(url).queryParam("key", "AIzaSyBR4j_w5BpP6UVYyqiT52C3gyyXbkN7amw")
                        .build().toUriString(),
                HttpMethod.POST, entity, Identity.class);

        // Return token
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to sign in: " + response.getStatusCode());
        }
    }

    private static record SignInRequest(String email, String password, boolean returnSecureToken) {
    }
}