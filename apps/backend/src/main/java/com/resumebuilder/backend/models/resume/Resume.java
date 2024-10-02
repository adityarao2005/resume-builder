package com.resumebuilder.backend.models.resume;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.resumebuilder.backend.models.Builder;
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

    public Resume(Resume other) {
        this.userId = other.userId;
        this.documentId = other.documentId;
        this.data = other.data;
        this.version = other.version;
        this.createdAt = other.createdAt;
        this.job = other.job;
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

    public static class ResumeBuilder implements Builder<Resume> {
        private Resume resume;

        public ResumeBuilder() {
            resume = new Resume();
        }

        public ResumeBuilder withId(String id) {
            resume.setId(id);
            return this;
        }

        public ResumeBuilder withUserId(String userId) {
            resume.setUserId(userId);
            return this;
        }

        public ResumeBuilder withDocumentId(String documentId) {
            resume.setDocumentId(documentId);
            return this;
        }

        public ResumeBuilder withData(ResumeData data) {
            resume.setData(data);
            return this;
        }

        public ResumeBuilder withVersion(int version) {
            resume.setVersion(version);
            return this;
        }

        public ResumeBuilder withCreatedAt(LocalDate createdAt) {
            resume.setCreatedAt(createdAt);
            return this;
        }

        public ResumeBuilder withJob(Job job) {
            resume.setJob(job);
            return this;
        }

        @Override
        public Resume build() {
            return new Resume(resume);
        }
    }
}
