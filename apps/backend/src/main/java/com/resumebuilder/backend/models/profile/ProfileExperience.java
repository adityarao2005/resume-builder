package com.resumebuilder.backend.models.profile;

import java.util.List;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Skill;

public class ProfileExperience extends Experience {
    private List<Skill> skills;

    // Constructors, getters, and setters
    public ProfileExperience() {
    }

    public ProfileExperience(String title, String company, Duration duration, Description description, Address location,
            List<Skill> skills) {
        super(title, company, duration, description, location);
        this.skills = skills;
    }

    public List<Skill> getSkills() {
        return skills;
    }
}
