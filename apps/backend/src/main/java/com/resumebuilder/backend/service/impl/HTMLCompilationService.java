package com.resumebuilder.backend.service.impl;

import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.service.ResumeCompilationService;

import org.springframework.stereotype.Service;

@Service
public class HTMLCompilationService implements ResumeCompilationService {

    @Override
    public ResumeCompilationReport compileResume(ResumeCompilationRequest request, Resume resume) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'compileResume'");
    }

}
