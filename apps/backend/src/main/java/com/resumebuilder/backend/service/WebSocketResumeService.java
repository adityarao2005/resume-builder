package com.resumebuilder.backend.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.models.resume.Resume;

@Service
@Scope(scopeName = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class WebSocketResumeService {
    @Autowired
    private ResumeService resumeService;
    @Autowired
    private WebSocketIdentityService identityService;

    private String documentId;
    private Resume version;

    public WebSocketResumeService() {
    }

    // Get the resume: Only for read only purposes
    public Optional<Resume> getCurrentResume(String documentId) {
        // Get the latest resume
        Optional<Resume> optionalResume = resumeService.getLatestResume(documentId,
                identityService.getIdentity().getUsername());
        // Store the document id if this exists
        if (optionalResume.isPresent()) {
            // Store document id
            this.documentId = documentId;
        }
        return optionalResume;
    }

    public boolean isResumeAvailable() {
        return documentId != null;
    }

    // Create a new resume based off of the previous resume's fields
    public Resume aquireResume() {
        // If the version already exists get it
        if (version != null) {
            return version;
        }

        // If this is the first time we are creating a resume then get the latest
        // version
        Resume prevVersion = resumeService.getLatestResume(documentId, identityService.getIdentity().getUsername())
                .get();
        if (prevVersion.getVersion() == ResumeService.INITIAL_VERSION) {
            this.version = prevVersion;
            this.version.setVersion(1);
            return version;
        }

        // Get the latest resume and create a clone of it
        Resume resume = new Resume(prevVersion);
        resume.setVersion(resume.getVersion() + 1);
        resume.setCreatedAt(LocalDate.now());
        resume.setId(null);

        this.version = resumeService.saveOrUpdateResume(resume);
        return version;
    }

}
