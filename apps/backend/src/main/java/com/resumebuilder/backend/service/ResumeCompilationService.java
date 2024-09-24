package com.resumebuilder.backend.service;

import com.resumebuilder.backend.models.resume.Resume;

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

    public ResumeCompilationReport compileResume(ResumeCompilationRequest request) throws Exception;
}
