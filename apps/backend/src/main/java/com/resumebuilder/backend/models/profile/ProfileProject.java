package com.resumebuilder.backend.models.profile;

import java.util.List;

import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Skill;

public class ProfileProject extends Project {
    private List<Skill> skills;

    // Constructors, getters, and setters
    public ProfileProject() {
    }

    public ProfileProject(String title, Duration duration, Description description, List<Skill> skills) {
        super(title, duration, description);
        this.skills = skills;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
    
}
