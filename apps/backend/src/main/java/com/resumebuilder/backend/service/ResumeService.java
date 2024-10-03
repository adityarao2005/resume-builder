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

    public static final int INITIAL_VERSION = 0;

    /**
     * Get all resumes for the current user
     * Use case: see all resumes for the current user including previous versions
     * Usability: not known if this is a useful feature... probably not
     */
    public List<Resume> getResumesByUserId(String userId) {
        return resumeRepository.findByUserId(userId);
    }

    /**
     * Save a new resume for the current user
     * when creation of resume occurs or update to current version, this is how it
     * will get saved
     */
    public Resume saveOrUpdateResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    /**
     * Deletion of a resume
     * Think of resume history as a blockchain
     * Only if the entire chain is deleted will the document be deleted
     * therefore no
     * deleting the history
     */
    public void deleteResume(String documentId, String userId) {
        resumeRepository.deleteByDocumentIdAndUserId(documentId, userId);
    }

    /**
     * Get the latest version of all resumes for the current user
     * Use case: see all resumes for the current user, but only the latest
     * version
     */
    public List<Resume> getAllLatestResumesByUserId(String userId) {
        return resumeRepository.findLatestVersionsByUserId(userId);
    }

    // Get the history of a resume by ID
    // Implement getting the history of a resume by ID, especially when
    // viewing a resume history
    public List<Resume> getResumeHistory(String documentId, String userId) {
        return resumeRepository.findByDocumentIdAndUserId(documentId, userId);
    }

    /**
     * Get the current version of a resume by ID
     * Implement getting the current version of a resume by ID, especially
     * when viewing and editing a resume
     */
    public Optional<Resume> getLatestResume(String documentId, String userId) {
        return resumeRepository.findLatestVersionOfResume(documentId, userId);
    }

}
