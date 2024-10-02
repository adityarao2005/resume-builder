package com.resumebuilder.backend.models.profile;

import java.util.List;

import com.resumebuilder.backend.models.Builder;
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

    public static class ProfileProjectBuilder implements Builder<ProfileProject> {
        private ProfileProject project;

        public ProfileProjectBuilder() {
            project = new ProfileProject();
        }

        public ProfileProjectBuilder withTitle(String title) {
            project.setTitle(title);
            return this;
        }

        public ProfileProjectBuilder withDuration(Duration duration) {
            project.setDuration(duration);
            return this;
        }

        public ProfileProjectBuilder withDescription(Description description) {
            project.setDescription(description);
            return this;
        }

        public ProfileProjectBuilder withSkills(List<Skill> skills) {
            project.setSkills(skills);
            return this;
        }

        @Override
        public ProfileProject build() {
            return project;
        }
    }

}
