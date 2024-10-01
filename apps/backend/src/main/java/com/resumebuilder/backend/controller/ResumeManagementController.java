package com.resumebuilder.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.service.ResumeService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

    @DeleteMapping("/resume/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResume(@PathVariable("id") String documentId, @AuthenticationPrincipal UserDetails userDetails) {
        // Delete the resume by ID
        service.deleteResume(documentId);
    }

    @GetMapping("/resume")
    public List<Resume> getAllResumes(@AuthenticationPrincipal UserDetails userDetails) {
        // Get all resumes for the current user
        return service.getAllLatestResumesByUserId(userDetails.getUsername());
    }

    @GetMapping("/resume/history/{id}")
    public List<Resume> getResumeHistory(@PathVariable("id") String documentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Get the history of a resume by ID
        return service.getResumeHistory(documentId, userDetails.getUsername());
    }

    @PostMapping("/resume")
    @ResponseStatus(HttpStatus.CREATED)
    public Resume createResume(@RequestBody Resume entity, @AuthenticationPrincipal UserDetails userDetails) {
        // Set defaults for resume then persist it
        entity.setDocumentId(UUID.randomUUID().toString());
        entity.setVersion(ResumeService.INITIAL_VERSION);
        entity.setUserId(userDetails.getUsername());
        entity.setCreatedAt(LocalDate.now());
        entity.setId(null);
        return service.saveOrUpdateResume(entity);
    }

}
