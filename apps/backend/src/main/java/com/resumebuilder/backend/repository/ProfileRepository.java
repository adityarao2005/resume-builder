package com.resumebuilder.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.resumebuilder.backend.models.profile.Profile;
import java.util.Optional;

@Repository
public interface ProfileRepository extends MongoRepository<Profile, String> {
    // Custom query methods can be defined here
    Optional<Profile> findByUserId(String userId);
}
