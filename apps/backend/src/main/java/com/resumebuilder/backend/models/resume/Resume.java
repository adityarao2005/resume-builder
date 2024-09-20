package com.resumebuilder.backend.models.resume;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.resumebuilder.backend.models.Job;

@Document(collection = "resumes")
public class Resume {
    @Id
    private String id;
    private String userId;
    private String documentId;
    private ResumeData data;
    private int version;
    private LocalDate createdAt;
    private Job job;

    // Constructors, getters, and setters
    public Resume() {
    }

    public Resume(String id, String userId, String documentId, ResumeData data, int version, LocalDate createdAt,
            Job job) {
        this.id = id;
        this.userId = userId;
        this.documentId = documentId;
        this.data = data;
        this.version = version;
        this.createdAt = createdAt;
        this.job = job;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public ResumeData getData() {
        return data;
    }

    public void setData(ResumeData data) {
        this.data = data;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

}
