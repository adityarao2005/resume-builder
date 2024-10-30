package com.resumebuilder.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.ContactInfo.ContactInfoBuilder;
import com.resumebuilder.backend.models.resume.ResumeData.ResumeDataBuilder;
import com.resumebuilder.backend.service.IdentityService;
import com.resumebuilder.backend.service.ResumeService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

// ResumeManagementController handles HTTP requests related to resume management.
@RestController
public class ResumeManagementController {
    // Injecting ResumeService and IdentityService dependencies
    @Autowired
    private ResumeService service;
    // Injecting IdentityService to manage user identity
    @Autowired
    private IdentityService identityService;

    // Endpoint to delete a resume by its ID
    @DeleteMapping("/resume/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResume(@PathVariable("id") String documentId) {
        // Delete the resume by ID
        service.deleteResume(documentId, identityService.getUserId());
    }

    // Endpoint to get all resumes for the current user
    @GetMapping("/resume")
    public List<Resume> getAllResumes() {
        // Get all resumes for the current user
        return service.getAllLatestResumesByUserId(identityService.getUserId());
    }

    // Endpoint to get the history of a resume by its ID
    @GetMapping("/resume/history/{id}")
    public List<Resume> getResumeHistory(@PathVariable("id") String documentId) {
        // Get the history of a resume by ID
        return service.getResumeHistory(documentId, identityService.getUserId());
    }

    // Endpoint to create a new resume
    @PostMapping("/resume")
    @ResponseStatus(HttpStatus.CREATED)
    public Resume createResume(@RequestBody Resume entity) {
        // Set defaults for resume then persist it
        entity.setDocumentId(UUID.randomUUID().toString());
        entity.setVersion(ResumeService.INITIAL_VERSION);
        entity.setData(Builder.create(ResumeDataBuilder.class)
                .withName("")
                .withEducation(List.of())
                .withContactInfo(Builder.create(ContactInfoBuilder.class)
                        .withMediaProfiles(List.of())
                        .build())
                .withHighlights(List.of())
                .withExperience(List.of())
                .withProjects(List.of())
                .withExtraCurriculars(List.of())
                .withAwards(List.of())
                .withHobbies(List.of())
                .withSkills(List.of())
                .build());
        entity.setUserId(identityService.getUserId());
        entity.setCreatedAt(LocalDate.now());
        entity.setId(null);
        return service.saveOrUpdateResume(entity);
    }

}
