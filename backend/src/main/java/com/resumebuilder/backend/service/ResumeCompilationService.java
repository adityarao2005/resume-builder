package com.resumebuilder.backend.service;

import com.resumebuilder.backend.models.resume.Resume;

// 1. Define the ResumeCompilationService interface
public interface ResumeCompilationService {
    // 2. Define the ResumeCompilationReport record
    public static record ResumeCompilationReport(String documentId, boolean error, Object data) {
        public ResumeCompilationReport(String documentId, boolean error, Object data) {
            this.documentId = documentId;
            this.error = error;
            this.data = data;
        }

        // 3. Define a constructor for successful compilation
        public ResumeCompilationReport(String documentId, Object data) {
            this(documentId, false, data);
        }

    }

    // 4. Define the ResumeCompilationFormat enum
    public static enum ResumeCompilationFormat {
        PDF,
        JSON
    }

    // 5. Define the ResumeCompilationRequest record
    public static record ResumeCompilationRequest(Resume resume, ResumeCompilationFormat format) {
    }

    // 6. Define the compileResume method
    public ResumeCompilationReport compileResume(ResumeCompilationRequest request, Resume resume) throws Exception;
}
