package com.resumebuilder.backend.service;

import java.util.List;

import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.profile.Profile;
import com.resumebuilder.backend.models.resume.Resume;

public interface MLService {

    public record MLResumeScoreResponse(int score, List<String> pros, List<String> cons, List<String> improvements) {
    }

    public MLResumeScoreResponse getResumeScore(Resume resume);

    public Resume generateResume(Profile profile, Job job);

}