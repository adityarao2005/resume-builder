package com.resumebuilder.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.service.ResumeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ResumeManagementController {
    @Autowired
    private ResumeService service;

    @Autowired
    private UserDetails userDetails;

    @DeleteMapping("/resume/{id}")
    public void deleteResume(@PathVariable("id") String documentId) {
        // Delete the resume by ID
        service.deleteResume(documentId);
    }

    @GetMapping("/resume")
    public List<Resume> getAllResumes() {
        // Get all resumes for the current user
        return service.getAllLatestResumesByUserId(userDetails.getUsername());
    }

    @GetMapping("/resume/history/{id}")
    public List<Resume> getResumeHistory(@PathVariable("id") String documentId) {
        // Get the history of a resume by ID
        return service.getResumeHistory(documentId, userDetails.getUsername());
    }

}
