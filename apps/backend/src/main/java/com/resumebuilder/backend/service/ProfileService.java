package com.resumebuilder.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.profile.Profile;
import com.resumebuilder.backend.models.profile.Profile.ProfileBuilder;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.repository.ProfileRepository;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public Profile getProfileByUserId(String userId) {
        Optional<Profile> profileOptional = profileRepository.findById(userId);
        Profile profile;

        if (profileOptional.isEmpty()) {
            profile = Builder.create(ProfileBuilder.class)
                    .withId(userId)
                    .withContactInfo(new ContactInfo(null, List.of()))
                    .withEducation(List.of())
                    .withExperiences(List.of())
                    .withExtraCurriculars(List.of())
                    .withHobbies(List.of())
                    .withName("")
                    .withOtherAwards(List.of())
                    .withOtherSkills(List.of())
                    .withProjects(List.of())
                    .build();
            profile = profileRepository.save(profile);
        } else {
            profile = profileOptional.get();
        }

        return profile;
    }

    public Profile updateProfile(String userId, Profile profile) {
        profile.setId(userId);
        return profileRepository.save(profile);
    }
}
