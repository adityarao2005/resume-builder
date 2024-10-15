package com.resumebuilder.backend.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.resumebuilder.backend.models.resume.Resume;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends MongoRepository<Resume, String> {
    // Custom query methods can be defined here
    List<Resume> findByUserId(String userId);

    @Aggregation(pipeline = {
            "{ '$match': { 'userId': ?0 } }",
            "{ '$sort': { 'documentId': 1, 'version': -1 } }",
            "{ '$group': { '_id': '$documentId', 'latestResume': { '$first': '$$ROOT' } } }",
            "{ '$replaceRoot': { 'newRoot': '$latestResume' } }"
    })
    List<Resume> findLatestVersionsByUserId(String userId);

    List<Resume> findByDocumentId(String documentId);

    Optional<Resume> findByIdAndUserId(String id, String userId);

    List<Resume> findByDocumentIdAndUserId(String documentId, String userId);

    @Aggregation(pipeline = {
            "{ '$match': { 'documentId': ?0, 'userId': ?1 } }",
            "{ '$sort': { 'createdAt': -1 } }",
            "{ '$limit': 1 }"
    })
    Optional<Resume> findLatestVersionOfResume(String documentId, String userId);

    void deleteByDocumentIdAndUserId(String documentId, String userId);
}
