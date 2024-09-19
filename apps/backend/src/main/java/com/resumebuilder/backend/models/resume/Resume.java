package com.resumebuilder.backend.models.resume;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.resumebuilder.backend.models.Job;

@Document(collection = "resumes")
public class Resume {
    @Id
    private String id;
    private List<ResumeData> versions;
    private Job job;

    // Constructors, getters, and setters
    public Resume() {
    }

    public Resume(List<ResumeData> versions, Job job) {
        this.versions = versions;
        this.job = job;
    }

    public List<ResumeData> getVersions() {
        return versions;
    }

    public void setVersions(List<ResumeData> versions) {
        this.versions = versions;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
