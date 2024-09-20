package com.resumebuilder.backend.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.repository.ResumeRepository;

@Service
public class ResumeService {
    @Autowired
    private ResumeRepository resumeRepository;

    // Get all resumes for the current user
    public List<Resume> getResumes() {
        return resumeRepository.findAll();
    }

    public List<Resume> getResumesByUserId(String userId) {
        return resumeRepository.findByUserId(userId);
    }

    // Save a new resume
    public void saveResume(Resume resume) {
        resumeRepository.save(resume);
    }

    // Delete a resume by ID
    public void deleteResume(String resumeId) {
        resumeRepository.deleteById(resumeId);
    }

    // Get a resume by ID
    public Optional<Resume> getResumeById(String resumeId) {
        return resumeRepository.findById(resumeId);
    }

    public Optional<Resume> getResumeByIdAndUserId(String resumeId, String userId) {
        return resumeRepository.findByIdAndUserId(resumeId, userId);
    }

    // Update an existing resume
    public void updateResume(Resume resume) {
        resumeRepository.save(resume);
    }
}
