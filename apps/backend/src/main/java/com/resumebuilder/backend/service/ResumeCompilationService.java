package com.resumebuilder.backend.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.ResumeData;
import java.time.LocalDate;

public interface ResumeCompilationService {
    public static record ResumeCompilationReport(String documentId, boolean error, Object data) {
        public ResumeCompilationReport(String documentId, boolean error, Object data) {
            this.documentId = documentId;
            this.error = error;
            this.data = data;
        }

        public ResumeCompilationReport(String documentId, Object data) {
            this(documentId, false, data);
        }

    }

    public static enum ResumeCompilationFormat {
        PDF,
        JSON
    }

    public static record ResumeCompilationRequest(Resume resume, ResumeCompilationFormat format) {
    }

    public ResumeCompilationReport compileResume(ResumeCompilationRequest request, Resume resume) throws Exception;
}
