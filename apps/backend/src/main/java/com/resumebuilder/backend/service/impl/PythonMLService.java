package com.resumebuilder.backend.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.profile.Profile;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.service.MLService;

@Service
@Primary
public class PythonMLService implements MLService {
    @Value("${app.services.ml}")
    private String location;

    @Override
    public MLResumeScoreResponse getResumeScore(Resume resume) {
        // Create a rest template
        RestTemplate template = new RestTemplate();

        // Create the URL
        String url = UriComponentsBuilder.fromHttpUrl(location).path("/score_resume/").toUriString();

        System.out.println("Sending request to " + url);
        // Send a POST request to the ML service
        ResponseEntity<MLResumeScoreResponse> response = template.postForEntity(url, resume,
                MLResumeScoreResponse.class);

        // Check if the response is an error
        if (response.getStatusCode().isError()) {
            throw new RuntimeException("Failed to get resume score");
        }

        MLResumeScoreResponse body = response.getBody();
        System.out.println("Received response: " + body);
        // Return the response body
        return body;
    }

    record MLResumeGeneratorRequest(Profile profile, Job job) {
    }

    @Override
    public Resume generateResume(Profile profile, Job job) {
        // Create a rest template
        RestTemplate template = new RestTemplate();

        // Create the URL
        String url = UriComponentsBuilder.fromHttpUrl(location).path("/generate_resume/").toUriString();

        System.out.println("Sending request to " + url);

        // Create the request object
        MLResumeGeneratorRequest request = new MLResumeGeneratorRequest(profile, job);

        // Send a POST request to the ML service
        ResponseEntity<Resume> response = template.postForEntity(url, request,
                Resume.class);

        // Check if the response is an error
        if (response.getStatusCode().isError()) {
            throw new RuntimeException("Failed to get resume score");
        }

        Resume body = response.getBody();
        System.out.println("Received response: " + body);
        // Return the response body
        return body;
    }

}
