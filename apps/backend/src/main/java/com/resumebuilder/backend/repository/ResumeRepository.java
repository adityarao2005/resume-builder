package com.resumebuilder.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.resumebuilder.backend.models.resume.Resume;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends MongoRepository<Resume, String> {
    // Custom query methods can be defined here
    List<Resume> findByUserId(String userId);

    List<Resume> findByDocumentId(String documentId);

    Optional<Resume> findByIdAndUserId(String id, String userId);

    List<Resume> findByDocumentIdAndUserId(String documentId, String userId);

    Optional<Resume> findTopByDocumentIdAndUserIdOrderByCreatedAtDesc(String documentId, String userId);

    void deleteByDocumentId(String documentId);

    // TODO: Left off here with the ResumeRepository where we fixed the versioning
    // and need to reflect the changes onto the service and controller
    // Plan of action: when making changes to the resume by the client, the first
    // change after websocket session has started will create a new version of the
    // resume and the previous version will be archived.
    // Previous versions can be restored but will not be deleted unless the resume
    // "document" itself is deleted
}
