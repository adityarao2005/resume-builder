package com.resumebuilder.backend.service.impl;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.service.ResumeCompilationService;

@Service
@Primary
public class ReactPDFCompilationService implements ResumeCompilationService {

    @Override
    public ResumeCompilationReport compileResume(ResumeCompilationRequest request, Resume resume) {
        return new ResumeCompilationReport(request.resume().documentId(), resume);
    }

}
