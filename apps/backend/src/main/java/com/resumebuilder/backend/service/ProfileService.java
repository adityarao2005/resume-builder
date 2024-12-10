package com.resumebuilder.backend.service;

import java.util.List;

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
        Profile profile = profileRepository.findByUserId(userId);

        if (profile == null) {
            profile = Builder.create(ProfileBuilder.class)
                    .withUserId(userId)
                    .withContactInfo(new ContactInfo(null, List.of()))
                    .withEducation(List.of())
                    .withExperience(List.of())
                    .withExtraCurriculars(List.of())
                    .withHobbies(List.of())
                    .withName("")
                    .withOtherAwards(List.of())
                    .withOtherSkills(List.of())
                    .withProjects(List.of())
                    .build();
            profile = profileRepository.save(profile);
        }

        return profile;
    }

    public Profile updateProfile(String userId, Profile profile) {
        profile.setUserId(userId);
        return profileRepository.save(profile);
    }
}
