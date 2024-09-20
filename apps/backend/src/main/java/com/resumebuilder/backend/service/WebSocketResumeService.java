package com.resumebuilder.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.models.resume.Resume;

import jakarta.annotation.PreDestroy;

@Service
@Scope(scopeName = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class WebSocketResumeService {
    @Autowired
    private ResumeService resumeService;
    @Autowired
    private UserDetails userDetails;

    private Resume resume;

    public WebSocketResumeService() {
    }

    // Get the resume
    public Optional<Resume> getAndMakeCurrentResume(String resumeId) {
        Optional<Resume> optionalResume = resumeService.getResumeByIdAndUserId(resumeId, userDetails.getUsername());
        if (optionalResume.isPresent()) {
            this.resume = optionalResume.get();
        }
        return optionalResume;
    }

    public Resume getCurrentResume() {
        return resume;
    }

    @PreDestroy
    public void cleanup() {
        // Perform any cleanup actions if necessary
        resume = null;
    }
}
