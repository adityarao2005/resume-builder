package com.resumebuilder.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.ResumeData;
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

@RestController
public class ResumeManagementController {
    @Autowired
    private ResumeService service;
    @Autowired
    private IdentityService identityService;

    @DeleteMapping("/resume/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResume(@PathVariable("id") String documentId) {
        // Delete the resume by ID
        service.deleteResume(documentId, identityService.getUserId());
    }

    @GetMapping("/resume")
    public List<Resume> getAllResumes() {
        // Get all resumes for the current user
        return service.getAllLatestResumesByUserId(identityService.getUserId());
    }

    @GetMapping("/resume/history/{id}")
    public List<Resume> getResumeHistory(@PathVariable("id") String documentId) {
        // Get the history of a resume by ID
        return service.getResumeHistory(documentId, identityService.getUserId());
    }

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
                .withEmail("")
                .withPhone("")
                .withMediaProfiles(new HashMap<>())
                .build())
            .withHighlights(Description.from())
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
