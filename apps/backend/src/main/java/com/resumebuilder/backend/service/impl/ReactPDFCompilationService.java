package com.resumebuilder.backend.service.impl;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.service.ResumeCompilationService;

@Service
@Primary
public class ReactPDFCompilationService implements ResumeCompilationService {

    @Override
    public ResumeCompilationReport compileResume(ResumeCompilationRequest request) {
        return new ResumeCompilationReport(request.resume().getDocumentId(), request.resume());
    }

}
